const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../classic/src');
const feature = 'view/pages/ConNguoiLienQuan';
const classes = {};
function walk(folder) {
    return fs.readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
        const file = path.join(folder, entry.name);
        return entry.isDirectory() ? walk(file) : file.endsWith('.js') ? [file] : [];
    });
}
for (const file of [...walk(path.join(root, feature)), ...walk(path.join(root, 'view/components/ComBoDiaChi'))]) {
    const expected = 'DEMO.' + path.relative(root, file).slice(0, -3).split(path.sep).join('.');
    vm.runInNewContext(fs.readFileSync(file, 'utf8'), { Ext: {
        define(name, config) {
            assert.equal(name, expected, 'Namespace must match file path');
            assert.ok(!classes[name], 'Duplicate class');
            classes[name] = config;
        },
        util: { Format: { htmlEncode: value => value } },
        apply: Object.assign,
        id: () => 'test-person'
    } }, { filename: file });
}
for (const config of Object.values(classes)) {
    for (const required of config.requires || []) {
        if (required.startsWith('DEMO.view.pages.ConNguoiLienQuan.') || required.startsWith('DEMO.view.components.ComBoDiaChi.')) {
            assert.ok(classes[required], 'Missing dependency ' + required);
        }
    }
}
const base = 'DEMO.view.pages.ConNguoiLienQuan.';
const xtypes = new Map(Object.entries(classes).filter(([, config]) => config.xtype).map(([name, config]) => [config.xtype, name]));
function inspectItems(config, model) {
    assert.ok(!config.initComponent, 'Static views must not override initComponent');
    if (config.xtype && (config.xtype.startsWith('ThemMoiConNguoi_') || config.xtype.startsWith('MoiQuanHe_') || config.xtype.startsWith('ConNguoiLienQuan_'))) {
        assert.ok(xtypes.has(config.xtype), 'Missing xtype ' + config.xtype);
    }
    if (config.bind && config.bind.store) {
        const key = config.bind.store.slice(1, -1);
        assert.ok(model.stores[key], 'Missing store ' + key);
    }
    for (const item of config.items || []) {
        if (item && typeof item === 'object') { inspectItems(item, model); }
    }
}
for (const [name, config] of Object.entries(classes)) {
    if (!config.xtype) { continue; }
    const owner = name.includes('.ComBoDiaChi.') ? null : name.includes('.MoiQuanHe.') ? 'ThemMoi.MoiQuanHe.MoiQuanHe' :
        name.includes('.DanhSach.') ? 'DanhSach.ConNguoiLienQuan' : 'ThemMoi.ThemMoiConNguoi';
    inspectItems(config, owner ? classes[base + owner + '_ViewModel'] : classes['DEMO.view.components.ComBoDiaChi.ComBoDiaChi_ViewModel']);
}
const address = classes[base + 'ThemMoi.ThemMoiConNguoi_ViewDiaChi'];
const children = address.items[1].items[0].items;
assert.equal(children.length, 5, 'All five address instances must be present');
const comboAddress = classes['DEMO.view.components.ComBoDiaChi.ComBoDiaChi_View'];
assert.equal(comboAddress.items.length, 2, 'Both address modes must be present in one component');
for (const [index, child] of children.entries()) {
    assert.equal(child.xtype, 'ComBoDiaChi');
    assert.equal(child.reference, address.addressTypes[index][0] + 'Address');
    assert.equal(!!child.showCopy, index > 0);
    assert.ok(child.bind.keyMaTinh && child.bind.keyMaXa);
    if (index > 0) {
        assert.equal(child.copyFrom, address.addressTypes[index - 1][0] + 'Address');
        assert.equal(child.listeners.copyaddress, 'onCopyAddress');
    }
}
assert.equal(comboAddress.items[0].items.length, 5);
assert.equal(comboAddress.items[1].items.length, 5);
assert.equal(comboAddress.items[1].hidden, true);
assert.equal(comboAddress.items[1].disabled, true);
const addressData = comboAddress.getAddressData.call({
    getIsSapNhap: () => false,
    getDiaChiCu: () => 'Đường cũ', getKeyMaTinhCu: () => '01',
    getKeyMaXaCu: () => '00005', getQuocGiaCu: () => 'Việt Nam',
    getController: () => ({ lookupReference: key => ({ getRawValue: () => key === 'tinhCuField' ? 'Hà Nội' : 'Xã Đông Anh' }) })
});
assert.equal(addressData.maTinh, '01');
assert.equal(addressData.maXa, '00005');
assert.equal(addressData.xa, 'Xã Đông Anh');
let copiedAddress;
const addController = classes[base + 'ThemMoi.ThemMoiConNguoi_ViewController'];
addController.onCopyAddress.call({
    lookupReference: key => {
        assert.equal(key, 'noiSinhAddress');
        return { getAddressData: () => ({ dc: 'Địa chỉ nguồn', maTinh: '01' }) };
    }
}, {
    getCopyFrom: () => 'noiSinhAddress',
    setAddressData: data => { copiedAddress = data; }
});
assert.equal(copiedAddress.dc, 'Địa chỉ nguồn');
const controller = classes[base + 'DanhSach.ConNguoiLienQuan_ViewController'];
let data, page;
const state = { keyword: '  AN  ', role: 'Nhân chứng', gender: 'Nam' };
const store = { getProxy: () => ({ setData: rows => { data = rows; } }), loadPage: value => { page = value; } };
const model = {
    get: key => state[key.split('.')[1]],
    getStore: () => store,
    set: (key, values) => { Object.assign(state, values); }
};
const instance = Object.assign({}, controller, {
    getViewModel: () => model,
    records: [
        { hoTen: 'An', cccd: '001', vaiTro: 'Nhân chứng', gioiTinh: 'Nam' },
        { hoTen: 'An', cccd: '002', vaiTro: 'Khác', gioiTinh: 'Nam' },
        { hoTen: 'Bình', cccd: '003', vaiTro: 'Nhân chứng', gioiTinh: 'Nam' }
    ]
});
instance.onSearch();
assert.equal(data.length, 1);
assert.equal(data[0].cccd, '001');
assert.equal(page, 1);
instance.onPersonSaved(null, { person: { hoTen: 'Người thử nghiệm' }, addresses: { hienTai: { dc: 'Địa chỉ mẫu', qg: 'Việt Nam' } } });
assert.equal(data.length, 4);
assert.equal(data[0].hoTen, 'Người thử nghiệm');
assert.equal(data[0].noiO, 'Địa chỉ mẫu, Việt Nam');
instance.onPersonSaved(null, { person: { hoTen: 'Địa chỉ cũ' }, addresses: {}, oldAddresses: { hienTai: { dc: 'Đường cũ', qg: 'Việt Nam' } } });
assert.equal(data[0].noiO, 'Đường cũ, Việt Nam');
assert.equal(state.keyword, '');
assert.equal(page, 1);
console.log('PASS: ' + Object.keys(classes).length + ' class paths/dependencies, declarative views, store bindings, combined search, save-to-list and reset pagination. Browser rendering is not covered.');

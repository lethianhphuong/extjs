Ext.define('DEMO.view.pages.ConNguoiDemo2.ConNguoiDemo2_ViewPopup_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ConNguoiDemo2_ViewPopup_ViewController',

    // ================= ĐÓNG CỬA SỔ POPUP =================

    onClosePopup: function (btn) {
        let win = btn.up('window');
        if (win) {
            win.close();
        }
    },

    // ================= XỬ LÝ ẢNH CHÂN DUNG =================

    onPhotoClick: function () {
        let fileField = this.lookupReference('fileAvatar');
        if (fileField && fileField.fileInputEl && fileField.fileInputEl.dom) {
            fileField.fileInputEl.dom.click();
        }
    },

    onAvatarFileChange: function (field) {
        let fileInput = field.fileInputEl.dom;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            let file = fileInput.files[0];
            let url = URL.createObjectURL(file);
            let box = this.lookupReference('photoDisplay');
            if (box) {
                box.setHtml('<div style="display:flex; align-items:center; justify-content:center; width:100%; height:100%;"><img src="' + url + '" alt="Ảnh người liên quan" style="max-width:100%; max-height:150px; object-fit:cover; border-radius:2px;" /></div>');
            }
        }
    },

    // ================= ĐỒNG BỘ CCCD VÀ LÝ DO KHÔNG CÓ CCCD =================

    onCccdChange: function (field, newVal) {
        let txtLyDo = this.lookupReference('txtLyDoKhongCccd');
        if (!txtLyDo) return;

        let hasVal = newVal && newVal.trim().length > 0;
        txtLyDo.setDisabled(hasVal);
        if (hasVal) {
            txtLyDo.setValue('');
            txtLyDo.clearInvalid();
        }
    },

    // ================= TRA CỨU CSDL DÂN CƯ =================

    onTraCuuDanCu: function (btn) {
        let me = this;
        let hoTen = me.lookupReference('txtHoTen');
        let gioiTinh = me.lookupReference('cboGioiTinh');
        let ngaySinh = me.lookupReference('dtNgaySinh');
        let cccd = me.lookupReference('txtCccd');

        let checkFields = [hoTen, gioiTinh, ngaySinh, cccd];
        let missing = checkFields.filter(function (f) {
            let v = f.getValue();
            return !v || (typeof v === 'string' && !v.trim());
        });

        if (missing.length > 0) {
            missing.forEach(function (f) {
                f.markInvalid('Bắt buộc để tra cứu CSDL dân cư');
            });
            missing[0].focus();
            notiCommon.show({
                message: 'Cần nhập đủ Họ tên, Giới tính, Ngày sinh và CCCD để tra cứu',
                type: 'warning'
            });
            return;
        }

        checkFields.forEach(function (f) {
            f.clearInvalid();
        });

        btn.setDisabled(true);
        btn.setText('Đang tra...');

        Ext.defer(function () {
            btn.setDisabled(false);
            btn.setText('Tra cứu');

            // Autofill thông tin mẫu theo chuẩn HTML prototype
            me.lookupReference('dtNgayCapCccd').setValue(new Date(2021, 5, 18));
            me.lookupReference('txtNoiCapCccd').setValue('Cục Cảnh sát QLHC về TTXH');
            me.lookupReference('cboDanToc').setValue('Kinh');
            me.lookupReference('cboQuocTich').setValue('Việt Nam');

            // Quê quán
            me.lookupReference('dc_queQuan_dc').setValue('Thôn 4');
            me.lookupReference('dc_queQuan_xa').setValue('Xã Đông Anh');
            me.lookupReference('dc_queQuan_tinh').setValue('Hà Nội');

            // Nơi ĐKTT
            me.lookupReference('dc_dktt_dc').setValue('Số 12, ngõ 45, phố Láng Hạ');
            me.lookupReference('dc_dktt_xa').setValue('Phường Đống Đa');
            me.lookupReference('dc_dktt_tinh').setValue('Hà Nội');

            // Nơi ở hiện tại
            me.lookupReference('dc_hienTai_dc').setValue('Số 12, ngõ 45, phố Láng Hạ');
            me.lookupReference('dc_hienTai_xa').setValue('Phường Đống Đa');
            me.lookupReference('dc_hienTai_tinh').setValue('Hà Nội');

            notiCommon.show({
                message: 'Đã lấy thông tin từ CSDL quốc gia về dân cư',
                type: 'success'
            });
        }, 700);
    },

    // ================= ĐỊA CHỈ & SAO CHÉP =================

    onToggleSapNhap: function (cb, newVal) {
        let me = this;
        let rows = ['rowNoiSinh_old', 'rowQueQuan_old', 'rowDktt_old', 'rowTamTru_old', 'rowHienTai_old'];
        rows.forEach(function (ref) {
            let item = me.lookupReference(ref);
            if (item) {
                item.setHidden(!newVal);
            }
        });
    },

    onCopyAddressValues: function (fromPrefix, toPrefix, label) {
        let me = this;
        ['dc', 'xa', 'tinh', 'qg'].forEach(function (f) {
            let fromField = me.lookupReference('dc_' + fromPrefix + '_' + f);
            let toField = me.lookupReference('dc_' + toPrefix + '_' + f);
            if (fromField && toField) {
                toField.setValue(fromField.getValue());
            }

            let fromOld = me.lookupReference('dc_' + fromPrefix + '_' + f + '_old');
            let toOld = me.lookupReference('dc_' + toPrefix + '_' + f + '_old');
            if (fromOld && toOld) {
                toOld.setValue(fromOld.getValue());
            }
        });
        notiCommon.show({
            message: 'Đã sao chép ' + (label || '').toLowerCase(),
            type: 'info'
        });
    },

    onCopyQueQuan: function () {
        this.onCopyAddressValues('noiSinh', 'queQuan', 'nơi sinh');
    },

    onCopyDktt: function () {
        this.onCopyAddressValues('queQuan', 'dktt', 'quê quán');
    },

    onCopyTamTru: function () {
        this.onCopyAddressValues('dktt', 'tamTru', 'nơi đktt');
    },

    onCopyHienTai: function () {
        this.onCopyAddressValues('tamTru', 'hienTai', 'nơi tạm trú');
    },

    // ================= MỐI QUAN HỆ =================

    onOpenAddQh: function () {
        let me = this;
        let win = Ext.create('Ext.window.Window', {
            title: 'Thêm mối quan hệ',
            cls: 'cnlq-editor',
            width: 620,
            modal: true,
            height: 330,
            layout: 'fit',
            items: [{
                xtype: 'ConNguoiDemo2_ViewQhPopup',
                parentView: me.getView()
            }]
        });
        win.show();
    },

    onSaveQh: function (btn) {
        let formQh = btn.up('ConNguoiDemo2_ViewQhPopup');
        let txtTen = formQh.lookupReference('txtQhTen');
        let cboQh = formQh.lookupReference('cboQhQuanHe');

        let ten = (txtTen.getValue() || '').trim();
        let qh = cboQh.getValue();

        let ok = true;
        if (!ten) {
            txtTen.markInvalid('Bắt buộc');
            ok = false;
        } else {
            txtTen.clearInvalid();
        }

        if (!qh) {
            cboQh.markInvalid('Bắt buộc');
            ok = false;
        } else {
            cboQh.clearInvalid();
        }

        if (!ok) {
            notiCommon.show({ message: 'Nhập họ tên và quan hệ', type: 'warning' });
            return;
        }

        let parentView = formQh.parentView || Ext.ComponentQuery.query('ConNguoiDemo2_ViewPopup')[0];
        if (parentView) {
            let store = parentView.getViewModel().getStore('moiQuanHeStore');
            if (store) {
                store.add({
                    ten: ten,
                    nam: (formQh.lookupReference('txtQhNam').getValue() || '').trim(),
                    gt: formQh.lookupReference('cboQhGt').getValue(),
                    cccd: (formQh.lookupReference('txtQhCccd').getValue() || '').trim(),
                    qh: qh,
                    noiO: (formQh.lookupReference('txtQhNoiO').getValue() || '').trim()
                });
            }
        }

        btn.up('window').close();
        notiCommon.show({ message: 'Đã thêm mối quan hệ', type: 'success' });
    },

    onDeleteQh: function (grid, rowIndex) {
        grid.getStore().removeAt(rowIndex);
        notiCommon.show({ message: 'Đã xóa mối quan hệ', type: 'info' });
    },

    // ================= THỐNG KÊ TRỐN, CHẾT =================

    onToggleTronChet: function (cb, newVal) {
        let cnt = this.lookupReference('cntTronChet');
        if (cnt) {
            cnt.setHidden(!newVal);
        }
    },

    onDvCap1Change: function (combo, newVal) {
        let me = this;
        let cboDv2 = me.lookupReference('cboDvCap2');
        let cboDv3 = me.lookupReference('cboDvCap3');
        let txtDvKhac = me.lookupReference('txtDvKhac');

        cboDv2.setHidden(true);
        cboDv2.setValue('');
        cboDv3.setHidden(true);
        cboDv3.setValue('');
        txtDvKhac.setHidden(newVal !== 'Khác');

        if (newVal === 'Trại tạm giam') {
            cboDv2.setFieldLabel('Trại tạm giam');
            cboDv2.setStore(['Trại tạm giam số 1 - CA TP Hà Nội', 'Trại tạm giam số 2 - CA TP Hà Nội', 'Trại tạm giam Chí Hòa', 'Trại tạm giam T16 - Bộ Công an']);
            cboDv2.setHidden(false);
        } else if (newVal === 'Nhà tạm giữ') {
            cboDv2.setFieldLabel('Nhà tạm giữ');
            cboDv2.setStore(['Nhà tạm giữ CA quận Ba Đình', 'Nhà tạm giữ CA quận Đống Đa', 'Nhà tạm giữ CA TP Thủ Đức', 'Nhà tạm giữ CA huyện Gia Lâm']);
            cboDv2.setHidden(false);
        } else if (newVal === 'Trụ sở công an') {
            cboDv2.setFieldLabel('Loại trụ sở');
            cboDv2.setStore(['Cơ quan CSĐT', 'Cơ quan khác', 'Công an xã']);
            cboDv2.setHidden(false);
        }
    },

    onDvCap2Change: function (combo, newVal) {
        let me = this;
        let dv1 = me.lookupReference('cboDvCap1').getValue();
        let cboDv3 = me.lookupReference('cboDvCap3');

        if (dv1 !== 'Trụ sở công an') {
            cboDv3.setHidden(true);
            return;
        }

        cboDv3.setValue('');
        if (newVal === 'Cơ quan CSĐT') {
            cboDv3.setFieldLabel('Cơ quan CSĐT');
            cboDv3.setStore(['Cơ quan CSĐT Bộ Công an', 'Cơ quan CSĐT CA TP Hà Nội', 'Cơ quan CSĐT CA quận Cầu Giấy', 'Cơ quan CSĐT CA huyện Đông Anh']);
            cboDv3.setHidden(false);
        } else if (newVal === 'Cơ quan khác') {
            cboDv3.setFieldLabel('Cơ quan khác');
            cboDv3.setStore(['Cơ quan An ninh điều tra', 'Bộ đội Biên phòng', 'Cảnh sát biển', 'Kiểm lâm', 'Hải quan']);
            cboDv3.setHidden(false);
        } else if (newVal === 'Công an xã') {
            cboDv3.setFieldLabel('Công an xã/phường');
            cboDv3.setStore(['Công an phường Ba Đình', 'Công an phường Hoàn Kiếm', 'Công an xã Đông Anh', 'Công an xã Sóc Sơn']);
            cboDv3.setHidden(false);
        } else {
            cboDv3.setHidden(true);
        }
    },

    onTcLoaiChange: function (combo, newVal) {
        let me = this;
        let blkTron = me.lookupReference('cntBlkTron');
        let blkChet = me.lookupReference('cntBlkChet');

        if (blkTron) blkTron.setHidden(newVal !== 'tron');
        if (blkChet) blkChet.setHidden(newVal !== 'chet');

        if (newVal === 'tron') {
            me.syncTron();
        } else if (newVal === 'chet') {
            me.syncChet();
        }
    },

    // --- Nhánh Trốn ---

    syncTron: function () {
        let me = this;
        let cboHt = me.lookupReference('cboHtTron');
        let htTron = cboHt ? cboHt.getValue() : '';
        let txtKhac = me.lookupReference('txtHtTronKhac');
        let txtXp = me.lookupReference('txtXpTron');
        let wrapAdd = me.lookupReference('wrapAddTron');
        let cntDetail = me.lookupReference('cntTronDetail');
        let txtDdKhac = me.lookupReference('txtDdTronKhac');
        let cboDd = me.lookupReference('cboDdTron');
        let ddTron = cboDd ? cboDd.getValue() : '';

        let store = me.getViewModel().getStore('tronStore');
        let count = store ? store.getCount() : 0;

        let hasVal = !!htTron;
        let isKhac = htTron === 'Khác';

        if (txtKhac) txtKhac.setHidden(!isKhac);
        if (txtXp) txtXp.setHidden(!hasVal);
        if (wrapAdd) wrapAdd.setHidden(!hasVal);

        if (cntDetail) cntDetail.setHidden(count === 0);
        if (txtDdKhac) txtDdKhac.setHidden(count === 0 || ddTron !== 'Khác');
    },

    onHtTronChange: function () {
        this.syncTron();
    },

    onDdTronChange: function () {
        this.syncTron();
    },

    onAddTron: function () {
        let me = this;
        let cboHt = me.lookupReference('cboHtTron');
        let txtKhac = me.lookupReference('txtHtTronKhac');
        let txtXp = me.lookupReference('txtXpTron');

        let rawVal = cboHt.getValue();
        let ten = rawVal === 'Khác' ? (txtKhac.getValue() || '').trim() : rawVal;

        if (rawVal === 'Khác' && !ten) {
            txtKhac.markInvalid('Ghi cụ thể hình thức trốn khác');
            notiCommon.show({ message: 'Ghi cụ thể hình thức trốn khác', type: 'warning' });
            return;
        }
        txtKhac.clearInvalid();

        if (!ten) {
            notiCommon.show({ message: 'Vui lòng chọn hình thức trốn', type: 'warning' });
            return;
        }

        let store = me.getViewModel().getStore('tronStore');
        let exists = store.findBy(function (rec) {
            return (rec.get('ten') || '').toLowerCase() === ten.toLowerCase();
        }) !== -1;

        if (exists) {
            notiCommon.show({ message: 'Hình thức trốn này đã khai báo', type: 'warning' });
            return;
        }

        store.add({
            ten: ten,
            xuLy: (txtXp.getValue() || '').trim()
        });

        cboHt.setValue('');
        txtKhac.setValue('');
        txtXp.setValue('');
        me.syncTron();
        notiCommon.show({ message: 'Đã thêm hình thức trốn', type: 'success' });
    },

    onDeleteTron: function (grid, rowIndex) {
        grid.getStore().removeAt(rowIndex);
        this.syncTron();
        notiCommon.show({ message: 'Đã xóa hình thức trốn', type: 'info' });
    },

    // --- Nhánh Chết ---

    syncChet: function () {
        let me = this;
        let cboNn = me.lookupReference('cboNnChet');
        let nnChet = cboNn ? cboNn.getValue() : '';
        let txtKhac = me.lookupReference('txtNnChetKhac');
        let txtXp = me.lookupReference('txtXpChet');
        let wrapAdd = me.lookupReference('wrapAddChet');
        let cntDetail = me.lookupReference('cntChetDetail');
        let txtDdKhac = me.lookupReference('txtDdChetKhac');
        let cboDd = me.lookupReference('cboDdChet');
        let ddChet = cboDd ? cboDd.getValue() : '';

        let store = me.getViewModel().getStore('chetStore');
        let count = store ? store.getCount() : 0;

        let hasVal = !!nnChet;
        let isKhac = nnChet === 'Khác';

        if (txtKhac) txtKhac.setHidden(!isKhac);
        if (txtXp) txtXp.setHidden(!hasVal);
        if (wrapAdd) wrapAdd.setHidden(!hasVal);

        if (cntDetail) cntDetail.setHidden(count === 0);
        if (txtDdKhac) txtDdKhac.setHidden(count === 0 || ddChet !== 'Khác');
    },

    onNnChetChange: function () {
        this.syncChet();
    },

    onDdChetChange: function () {
        this.syncChet();
    },

    onAddChet: function () {
        let me = this;
        let cboNn = me.lookupReference('cboNnChet');
        let txtKhac = me.lookupReference('txtNnChetKhac');
        let txtXp = me.lookupReference('txtXpChet');

        let rawVal = cboNn.getValue();
        let ten = rawVal === 'Khác' ? (txtKhac.getValue() || '').trim() : rawVal;

        if (rawVal === 'Khác' && !ten) {
            txtKhac.markInvalid('Ghi cụ thể hình thức chết khác');
            notiCommon.show({ message: 'Ghi cụ thể hình thức chết khác', type: 'warning' });
            return;
        }
        txtKhac.clearInvalid();

        if (!ten) {
            notiCommon.show({ message: 'Vui lòng chọn nguyên nhân chết', type: 'warning' });
            return;
        }

        let store = me.getViewModel().getStore('chetStore');
        let exists = store.findBy(function (rec) {
            return (rec.get('ten') || '').toLowerCase() === ten.toLowerCase();
        }) !== -1;

        if (exists) {
            notiCommon.show({ message: 'Hình thức chết này đã khai báo', type: 'warning' });
            return;
        }

        store.add({
            ten: ten,
            xuLy: (txtXp.getValue() || '').trim()
        });

        cboNn.setValue('');
        txtKhac.setValue('');
        txtXp.setValue('');
        me.syncChet();
        notiCommon.show({ message: 'Đã thêm hình thức chết', type: 'success' });
    },

    onDeleteChet: function (grid, rowIndex) {
        grid.getStore().removeAt(rowIndex);
        this.syncChet();
        notiCommon.show({ message: 'Đã xóa hình thức chết', type: 'info' });
    },

    // ================= LƯU DỮ LIỆU CON NGƯỜI LIÊN QUAN =================

    onSaveConNguoi: function (btn) {
        let me = this;
        let form = me.getView();
        let n = 0;
        let first = null;

        // Kiểm tra toàn bộ form fields
        let fields = form.getForm().getFields();
        fields.each(function (f) {
            if (!f.isHidden() && !f.isDisabled() && !f.isValid()) {
                n++;
                if (!first) first = f;
            }
        });

        // Kiểm tra CCCD và lý do
        let cccd = (me.lookupReference('txtCccd').getValue() || '').trim();
        let txtLyDo = me.lookupReference('txtLyDoKhongCccd');
        let lyDo = (txtLyDo.getValue() || '').trim();

        if (!cccd && !lyDo) {
            txtLyDo.markInvalid('Lý do không có CCCD/CMND là bắt buộc khi chưa có CCCD');
            n++;
            if (!first) first = txtLyDo;
        } else {
            txtLyDo.clearInvalid();
        }

        // Kiểm tra khối trốn / chết nếu được kích hoạt
        let hasTronChet = me.lookupReference('chkTronChet').getValue();
        let trangThai = 'Bình thường';

        if (hasTronChet) {
            let cboDv1 = me.lookupReference('cboDvCap1');
            let dv1 = cboDv1.getValue();
            if (!dv1) {
                cboDv1.markInvalid('Bắt buộc');
                n++;
                if (!first) first = cboDv1;
            }

            if (dv1 === 'Khác') {
                let txtKhac = me.lookupReference('txtDvKhac');
                if (!(txtKhac.getValue() || '').trim()) {
                    txtKhac.markInvalid('Bắt buộc');
                    n++;
                    if (!first) first = txtKhac;
                }
            }

            let cboLoai = me.lookupReference('cboTcLoai');
            let loai = cboLoai.getValue();
            if (!loai) {
                cboLoai.markInvalid('Bắt buộc');
                n++;
                if (!first) first = cboLoai;
            }

            if (loai === 'tron') {
                let tronStore = me.getViewModel().getStore('tronStore');
                if (tronStore.getCount() === 0) {
                    let cboHt = me.lookupReference('cboHtTron');
                    cboHt.markInvalid('Bắt buộc');
                    n++;
                    if (!first) first = cboHt;
                    notiCommon.show({ message: 'Khai báo ít nhất một hình thức trốn', type: 'warning' });
                }

                let cboDd = me.lookupReference('cboDdTron');
                if (cboDd.getValue() === 'Khác') {
                    let txtDdKhac = me.lookupReference('txtDdTronKhac');
                    if (!(txtDdKhac.getValue() || '').trim()) {
                        txtDdKhac.markInvalid('Bắt buộc');
                        n++;
                        if (!first) first = txtDdKhac;
                    }
                }

                let dtTron = me.lookupReference('dtNgayTron').getValue();
                let dtBatLai = me.lookupReference('dtNgayBatLai').getValue();
                if (dtTron && dtBatLai && dtBatLai < dtTron) {
                    let fBatLai = me.lookupReference('dtNgayBatLai');
                    fBatLai.markInvalid('Ngày bắt lại không thể trước ngày trốn');
                    n++;
                    if (!first) first = fBatLai;
                }
                trangThai = dtBatLai ? 'Đã bắt lại' : 'Trốn';
            } else if (loai === 'chet') {
                let chetStore = me.getViewModel().getStore('chetStore');
                if (chetStore.getCount() === 0) {
                    let cboNn = me.lookupReference('cboNnChet');
                    cboNn.markInvalid('Bắt buộc');
                    n++;
                    if (!first) first = cboNn;
                    notiCommon.show({ message: 'Khai báo ít nhất một hình thức chết', type: 'warning' });
                }

                let cboDd = me.lookupReference('cboDdChet');
                if (cboDd.getValue() === 'Khác') {
                    let txtDdKhac = me.lookupReference('txtDdChetKhac');
                    if (!(txtDdKhac.getValue() || '').trim()) {
                        txtDdKhac.markInvalid('Bắt buộc');
                        n++;
                        if (!first) first = txtDdKhac;
                    }
                }
                trangThai = 'Đã chết';
            }
        }

        if (n > 0) {
            if (first) {
                first.focus();
                if (first.getEl() && first.getEl().dom) {
                    first.getEl().dom.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            notiCommon.show({ message: 'Còn ' + n + ' trường bắt buộc chưa nhập', type: 'warning' });
            return;
        }

        // Lấy địa chỉ hiện tại
        let dcHienTai = [
            me.lookupReference('dc_hienTai_dc').getValue(),
            me.lookupReference('dc_hienTai_xa').getValue(),
            me.lookupReference('dc_hienTai_tinh').getValue()
        ].filter(Boolean).join(', ');

        let dtSinhVal = me.lookupReference('dtNgaySinh').getValue();
        let strNgaySinh = dtSinhVal ? Ext.Date.format(dtSinhVal, 'd/m/Y') : '';

        // Thêm vào store chính của List View
        let mainView = Ext.ComponentQuery.query('ConNguoiDemo2_View')[0];
        let mainStore = mainView ? mainView.getViewModel().getStore('conNguoiStore') : null;

        let newRecord = {
            id: mainStore ? mainStore.getCount() + 1 : Date.now(),
            hoTen: me.lookupReference('txtHoTen').getValue(),
            tenKhac: me.lookupReference('txtTenKhac').getValue(),
            gioiTinh: me.lookupReference('cboGioiTinh').getValue(),
            ngaySinh: strNgaySinh,
            cccd: cccd || '',
            vaiTro: me.lookupReference('cboVaiTro').getValue(),
            soDt: me.lookupReference('txtSoDt').getValue(),
            diaChiHienTai: dcHienTai || 'Chưa cập nhật',
            tienAn: me.lookupReference('cboTienAn').getValue(),
            coTronChet: !!hasTronChet,
            trangThai: trangThai,
            ngheNghiep: me.lookupReference('cboNgheNghiep').getValue()
        };

        if (mainStore) {
            mainStore.insert(0, newRecord);
        }

        btn.up('window').close();
        notiCommon.show({ message: 'Đã lưu thông tin con người liên quan: ' + newRecord.hoTen, type: 'success' });
    }
});

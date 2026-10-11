Ext.define(
  "DEMO.view.pages.ConNguoiLienQuan.DanhSach.ConNguoiLienQuan_ViewController",
  {
    extend: "Ext.app.ViewController",
    alias: "controller.connguoilienquan",
    requires: ["DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_View"],

    init: function () {
      const me = this;
      me.records = me.getViewModel().createDemoData();
      me.onSearch();
    },

    /** Lọc toàn bộ dữ liệu trước khi phân trang bằng memory proxy. */
    onSearch: function () {
      const me = this,
        vm = me.getViewModel(),
        store = vm.getStore("peopleGridStore");
      const keyword = (vm.get("timKiemNangCao.keyword") || "")
        .trim()
        .toLocaleLowerCase("vi");
      const filtered = me.records
        .filter(function (row) {
          return (
            (!keyword ||
              (row.hoTen + " " + (row.cccd || ""))
                .toLocaleLowerCase("vi")
                .includes(keyword)) &&
            (!vm.get("timKiemNangCao.role") ||
              row.vaiTro === vm.get("timKiemNangCao.role")) &&
            (!vm.get("timKiemNangCao.gender") ||
              row.gioiTinh === vm.get("timKiemNangCao.gender"))
          );
        })
        .map(function (row, index) {
          return Ext.apply({ stt: index + 1 }, row);
        });
      store.getProxy().setData(filtered);
      store.loadPage(1);
    },

    onReset: function () {
      const me = this;
      me.getViewModel().set("timKiemNangCao", {
        keyword: "",
        role: null,
        gender: null,
      });
      me.onSearch();
    },

    onAdd: function () {
      const me = this;
      if (me.editor && !me.editor.destroyed) {
        me.editor.toFront();
        return;
      }
      const win = Ext.create("Ext.window.Window", {
        title: "Thêm mới thông tin con người liên quan",
        width: Math.min(1480, Ext.Element.getViewportWidth() - 24),
        height: Math.min(960, Ext.Element.getViewportHeight() - 24),
        constrain: true,
        cls: "cnlq-editor",
        items: [
          {
            xtype: "ThemMoiConNguoi_View",
            listeners: { personsaved: { fn: me.onPersonSaved, scope: me } },
          },
        ],
      });
      me.editor = win;
      win.show();
    },

    onPersonSaved: function (view, details) {
      const me = this;
      const current =
        details.addresses.hienTai || details.oldAddresses.hienTai || {};
      me.records.unshift({
        id: Ext.id(null, "person-"),
        hoTen: details.person.hoTen,
        vaiTro: details.person.vaiTro,
        gioiTinh: details.person.gioiTinh,
        ngaySinh: details.person.ngaySinh,
        cccd: details.person.cccd,
        soDt: details.person.soDt,
        noiO: [current.dc, current.xa, current.tinh, current.qg]
          .filter(Boolean)
          .join(", "),
        details: details,
      });
      me.onReset();
    },

    destroy: function () {
      const me = this;
      Ext.destroy(me.editor);
      me.records = null;
      me.callParent(arguments);
    },
  },
);

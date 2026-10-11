Ext.define(
  "DEMO.view.pages.ConNguoiLienQuan.ThemMoi.ThemMoiConNguoi_ViewController",
  {
    extend: "Ext.app.ViewController",
    alias: "controller.themmoiconguoi",

    //#region NOTE: Bố cục responsive và truy cập field qua reference
    onFormRowResize: function (row, width) {
      const me = this;
      const screenWidth = Ext.Element.getViewportWidth();
      const mode =
        screenWidth <= 620 ? "small" : screenWidth <= 1100 ? "medium" : "wide";
      if (row.columnMode === mode || !width || me.destroyed) {
        return;
      }
      row.columnMode = mode;
      row.items.each(function (item) {
        const span = item.formSpan || 12;
        item.columnWidth =
          mode === "small"
            ? 1
            : mode === "medium"
              ? span <= 4
                ? 0.5
                : 1
              : span / 12;
      });
      row.updateLayout();
    },

    requires: [
      "DEMO.view.pages.ConNguoiLienQuan.ThemMoi.MoiQuanHe.MoiQuanHe_View",
      "DEMO.app.NotiCommon",
    ],

    field: function (name) {
      const me = this;
      return me.lookupReference(name);
    },

    value: function (name) {
      const me = this;
      return me.field(name).getValue();
    },

    onReady: function () {
      const me = this;
      me.onCccdChange();
      me.onIncidentChange();
      me.resizeListener = Ext.on("resize", me.onViewportResize, me, {
        destroyable: true,
      });
    },

    onViewportResize: function () {
      const me = this,
        view = me.getView().up("window");
      if (!view.maximized) {
        view.setSize(
          Math.min(1480, Ext.Element.getViewportWidth() - 24),
          Math.min(960, Ext.Element.getViewportHeight() - 24),
        );
        view.center();
      }
    },

    setValue: function (name, value) {
      const me = this;
      me.getViewModel().set("person." + name, value);
      me.getViewModel().notify();
    },

    onAddressResize: function (container) {
      const me = this;
      const narrow = Ext.Element.getViewportWidth() <= 1100;
      if (container.narrow === narrow) {
        return;
      }
      container.narrow = narrow;
      me.lookupReference("addressLeft").columnWidth = narrow ? 1 : 0.75;
      me.lookupReference("businessRight").columnWidth = narrow ? 1 : 0.25;
      container.updateLayout();
    },
    //#endregion

    //#region NOTE: Thông tin cá nhân, địa chỉ và ảnh
    onCccdChange: function () {
      const me = this;
      if (!me.getView().rendered || !me.lookupReference("personForm")) {
        return;
      }
      const reason = me.field("lyDoKhongCccd"),
        hasId = !!String(me.value("cccd") || "").trim();
      reason.setDisabled(hasId);
      reason.allowBlank = hasId;
      if (hasId) {
        reason.removeCls("required");
      } else {
        reason.addCls("required");
      }
      if (hasId) {
        me.setValue("lyDoKhongCccd", "");
        reason.clearInvalid();
      }
    },

    onCopyAddress: function (target) {
      const source = this.lookupReference(target.getCopyFrom());
      target.setAddressData(source.getAddressData());
    },

    /** Chỉ mô phỏng tra cứu trên dữ liệu mẫu, không gọi dịch vụ dân cư. */
    onLookup: function () {
      const me = this;
      const missing = ["hoTen", "gioiTinh", "ngaySinh", "cccd"].filter(
        function (name) {
          const field = me.field(name);
          const empty = !String(field.getValue() || "").trim();
          if (empty) {
            field.markInvalid("Cần nhập để tra cứu mô phỏng");
          }
          return empty || !field.isValid();
        },
      );
      if (missing.length) {
        me.showError(
          "Nhập đủ họ tên, giới tính, ngày sinh và CCCD hợp lệ.",
          me.field(missing[0]),
        );
        return;
      }
      const values = {
        ngayCapCccd: new Date(2021, 5, 18),
        noiCapCccd: "Cục Cảnh sát QLHC về TTXH",
        danToc: "Kinh",
        quocTich: "Việt Nam",
        queQuan_dc: "Thôn 4",
        queQuan_maXa: "00005",
        queQuan_maTinh: "01",
        dktt_dc: "Số 12, ngõ 45, phố Láng Hạ",
        dktt_maXa: "00004",
        dktt_maTinh: "01",
      };
      Object.keys(values).forEach(function (name) {
        me.setValue(name, values[name]);
      });
      notiCommon.show({
        type: "info",
        title: "Tra cứu mô phỏng",
        message:
          "Đã điền dữ liệu mẫu, không phải kết quả tra cứu dân cư thực tế.",
      });
    },

    onPhotoChange: function (field) {
      const me = this,
        file = field.fileInputEl.dom.files[0];
      if (!file) {
        return;
      }
      if (!/^image\//.test(file.type)) {
        me.showError("Vui lòng chọn tệp hình ảnh.");
        field.reset();
        return;
      }
      const reader = new FileReader();
      if (me.photoReader && me.photoReader.readyState === 1) {
        me.photoReader.abort();
      }
      me.photoReader = reader;
      reader.onload = function () {
        if (me.destroyed || me.getView().destroyed) {
          return;
        }
        me.photoData = reader.result;
        const preview = me.lookupReference("photoPreview");
        preview.setSrc(me.photoData);
        preview.show();
        me.lookupReference("photoPlaceholder").hide();
        field.reset();
      };
      reader.onerror = function () {
        me.showError("Không đọc được ảnh. Vui lòng chọn lại.");
        field.reset();
      };
      reader.readAsDataURL(file);
    },
    //#endregion

    //#region NOTE: Quan hệ gia đình
    onAddRelation: function () {
      const me = this;
      const win = Ext.create("Ext.window.Window", {
        title: "Thêm mối quan hệ",
        width: Math.min(620, Ext.Element.getViewportWidth() - 32),
        height: Math.min(420, Ext.Element.getViewportHeight() - 32),
        constrain: true,
        cls: "cnlq-editor",
        items: [
          {
            xtype: "MoiQuanHe_View",
            listeners: { relationsaved: { fn: me.onRelationSaved, scope: me } },
          },
        ],
      });
      me.relationEditor = win;
      win.show();
    },

    onRelationSaved: function (view, row) {
      const me = this;
      me.getViewModel().getStore("relationsGridStore").add(row);
    },

    onRemoveRow: function (grid, index) {
      const me = this;
      grid.getStore().removeAt(index);
      me.onIncidentChange();
    },
    //#endregion

    //#region NOTE: Đơn vị, trường hợp trốn/chết và validation động
    setActive: function (component, active, required) {
      component.setHidden(!active);
      component.setDisabled(!active);
      if (component.isFormField) {
        component.allowBlank = !(active && required);
        if (active && required) {
          component.addCls("required");
        } else {
          component.removeCls("required");
        }
        if (!active) {
          component.clearInvalid();
        }
      }
    },

    onUnitChange: function (field, value) {
      const me = this;
      if (!me.getView().rendered || !me.lookupReference("personForm")) {
        return;
      }
      const child = me.field("dvCap2");
      me.setValue("dvCap2", null);
      me.setValue("dvCap3", null);
      child.getStore().loadData(
        (me.getViewModel().unitOptions[value] || []).map(function (text) {
          return { value: text, text: text };
        }),
      );
      child.setFieldLabel(
        value === "Trụ sở công an" ? "Loại trụ sở" : "Đơn vị chi tiết",
      );
      me.onIncidentChange();
    },

    onUnitChildChange: function (field, value) {
      const me = this;
      if (!me.getView().rendered || !me.lookupReference("personForm")) {
        return;
      }
      const child = me.field("dvCap3");
      me.setValue("dvCap3", null);
      child.getStore().loadData(
        (me.getViewModel().unitOptions[value] || []).map(function (text) {
          return { value: text, text: text };
        }),
      );
      child.setFieldLabel("Cơ quan / đơn vị");
      me.onIncidentChange();
    },

    /** Đồng bộ các nhánh; trường ẩn không tham gia validation. */
    onIncidentChange: function (field, checked) {
      const me = this,
        vm = me.getViewModel();
      if (
        !me.getView().rendered ||
        !me.lookupReference("personForm") ||
        me.syncing
      ) {
        return;
      }
      if (field && field.isCheckbox) {
        vm.set("hasIncident", checked);
      }
      me.syncing = true;
      try {
        const enabled = !!vm.get("hasIncident");
        me.setActive(me.lookupReference("incidentWrap"), enabled);
        const unit = me.value("dvCap1"),
          type = me.value("tcLoai");
        me.setActive(me.field("dvCap1"), enabled, true);
        me.setActive(me.field("tcLoai"), enabled, true);
        me.setActive(
          me.field("dvCap2"),
          enabled && !!unit && unit !== "Khác",
          true,
        );
        me.setActive(
          me.field("dvCap3"),
          enabled && unit === "Trụ sở công an" && !!me.value("dvCap2"),
          true,
        );
        me.setActive(me.field("dvKhac"), enabled && unit === "Khác", true);
        ["tron", "chet"].forEach(function (branch) {
          const active = enabled && type === branch,
            escape = branch === "tron";
          const suffix = escape ? "Tron" : "Chet",
            reason = escape ? "htTron" : "nnChet";
          const hasRows =
            vm
              .getStore(escape ? "escapesGridStore" : "deathsGridStore")
              .getCount() > 0;
          const selected = me.value(reason);
          me.setActive(me.lookupReference(branch + "Branch"), active);
          me.setActive(
            me.field(reason + "Khac"),
            active && selected === "khac",
            true,
          );
          me.setActive(me.field("xp" + suffix), active && !!selected);
          me.setActive(
            me.lookupReference("add" + suffix),
            active && !!selected,
          );
          me.setActive(
            me.lookupReference(branch + "Details"),
            active && hasRows,
          );
          me.setActive(
            me.field("dd" + suffix + "Khac"),
            active && hasRows && me.value("dd" + suffix) === "khac",
            true,
          );
        });
      } finally {
        me.syncing = false;
      }
    },

    onAddIncident: function (button) {
      const me = this,
        escape = button.incidentType === "tron";
      const reason = escape ? "htTron" : "nnChet",
        suffix = escape ? "Tron" : "Chet";
      const selection = me.value(reason),
        text = String(
          selection === "khac"
            ? me.value(reason + "Khac") || ""
            : selection || "",
        ).trim();
      const store = me
        .getViewModel()
        .getStore(escape ? "escapesGridStore" : "deathsGridStore");
      if (!text) {
        me.showError(
          "Chọn hoặc nhập cụ thể hình thức / nguyên nhân.",
          me.field(selection === "khac" ? reason + "Khac" : reason),
        );
        return;
      }
      if (
        store.findBy(function (row) {
          return (
            row.get("ten").toLocaleLowerCase("vi") ===
            text.toLocaleLowerCase("vi")
          );
        }) !== -1
      ) {
        me.showError("Hình thức / nguyên nhân này đã được khai báo.");
        return;
      }
      store.add({
        ten: text,
        xuLy: String(me.value("xp" + suffix) || "").trim(),
      });
      [reason, reason + "Khac", "xp" + suffix].forEach(function (name) {
        me.setValue(name, null);
      });
      me.onIncidentChange();
    },
    //#endregion

    //#region NOTE: Kiểm tra, lưu dữ liệu và dọn dẹp popup
    showError: function (message, field) {
      const me = this;
      notiCommon.show({
        type: "error",
        title: "Kiểm tra thông tin",
        message: message,
        onClose: function () {
          if (field && !field.destroyed && !me.destroyed) {
            field
              .getEl()
              .scrollIntoView(me.lookupReference("personForm").body, false);
            field.focus();
          }
        },
      });
    },

    /** Lưu bản ghi độc lập; chỉ lấy các khối dữ liệu đang hoạt động. */
    onSave: function () {
      const me = this,
        vm = me.getViewModel(),
        form = me.lookupReference("personForm").getForm();
      if (me.saved) {
        return;
      }
      if (me.photoReader && me.photoReader.readyState === 1) {
        me.showError("Ảnh đang được đọc, vui lòng chờ rồi lưu lại.");
        return;
      }
      form.getFields().each(function (field) {
        if (!field.isDisabled() && typeof field.getValue() === "string") {
          field.setValue(field.getValue().trim());
        }
      });
      me.onIncidentChange();
      if (!form.isValid()) {
        me.showError(
          "Vui lòng kiểm tra các trường được đánh dấu.",
          form.getFields().findBy(function (field) {
            return !field.isValid();
          }),
        );
        return;
      }
      const incident = !!vm.get("hasIncident"),
        type = me.value("tcLoai");
      if (incident) {
        const rows = vm.getStore(
          type === "tron" ? "escapesGridStore" : "deathsGridStore",
        );
        if (!rows.getCount()) {
          me.showError(
            "Khai báo ít nhất một hình thức trốn hoặc nguyên nhân chết.",
            me.field(type === "tron" ? "htTron" : "nnChet"),
          );
          return;
        }
        if (
          type === "tron" &&
          me.value("ngayTron") &&
          me.value("ngayBatLai") &&
          me.value("ngayBatLai") < me.value("ngayTron")
        ) {
          me.field("ngayBatLai").markInvalid(
            "Ngày bắt lại không được trước ngày trốn.",
          );
          me.showError(
            "Ngày bắt lại không được trước ngày trốn.",
            me.field("ngayBatLai"),
          );
          return;
        }
      }
      const person = {};
      me.lookupReference("personalSection")
        .query("[isFormField=true]")
        .forEach(function (field) {
          if (field.name && !field.isDisabled()) {
            person[field.name] = field.getValue();
          }
        });
      ["maTuy", "lucLuongVt", "doiTuongNv", "sucKhoe"].forEach(function (name) {
        person[name] = me.value(name);
      });
      const addresses = {},
        oldAddresses = {};
      me.lookupReference("addressSection").addressTypes.forEach(
        function (entry) {
          const data = me
            .lookupReference(entry[0] + "Address")
            .getAddressData();
          if (vm.get("oldAddresses")) {
            oldAddresses[entry[0]] = data;
          } else {
            addresses[entry[0]] = data;
          }
        },
      );
      let incidentData = null;
      if (incident) {
        incidentData = { type: type, unit: {}, details: {}, reasons: [] };
        ["dvCap1", "dvCap2", "dvCap3", "dvKhac"].forEach(function (name) {
          if (!me.field(name).isDisabled()) {
            incidentData.unit[name] = me.value(name);
          }
        });
        me.lookupReference(type + "Details")
          .query("[isFormField=true]")
          .forEach(function (field) {
            if (!field.isDisabled()) {
              incidentData.details[field.name] = field.getValue();
            }
          });
        incidentData.reasons = vm
          .getStore(type === "tron" ? "escapesGridStore" : "deathsGridStore")
          .getRange()
          .map(function (row) {
            return { ten: row.get("ten"), xuLy: row.get("xuLy") };
          });
      }
      const details = Ext.clone({
        person: person,
        photo: me.photoData || null,
        addresses: addresses,
        oldAddresses: oldAddresses,
        relations: vm
          .getStore("relationsGridStore")
          .getRange()
          .map(function (row) {
            return row.getData();
          }),
        incident: incidentData,
      });
      me.saved = true;
      me.getView().fireEvent("personsaved", me.getView(), details);
      me.getView().up("window").close();
      notiCommon.show({
        type: "success",
        title: "Thành công",
        message:
          "Đã thêm con người liên quan vào danh sách của phiên làm việc.",
      });
    },

    onClose: function () {
      const me = this;
      me.getView().up("window").close();
    },

    destroy: function () {
      const me = this;
      if (me.photoReader) {
        me.photoReader.onload = me.photoReader.onerror = null;
        if (me.photoReader.readyState === 1) {
          me.photoReader.abort();
        }
      }
      Ext.destroy(me.relationEditor, me.resizeListener);
      me.photoData = null;
      me.callParent(arguments);
    },
    //#endregion
  },
);

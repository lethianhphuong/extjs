Ext.define('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dexuatctvbm',

    requires: [
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupChonNguoi',
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupB5',
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupKetQuaB5',
        'DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupFeedback'
    ],

    init: function () {
        const me = this;
        me.callParent(arguments);

        const vm = me.getViewModel();
        if (vm) {
            const store = vm.getStore('yeuCauTraCuuGridStore');
            if (store) {
                store.on({
                    datachanged: me.syncTotalCounter,
                    scope: me
                });
            }
        }
    },

    /**
     * Đồng bộ số lượng yêu cầu tra cứu lên badge toolbar
     */
    syncTotalCounter: function () {
        const me = this;
        const vm = me.getViewModel();
        if (!vm) {
            return;
        }

        const store = vm.getStore('yeuCauTraCuuGridStore');
        const count = store ? store.getCount() : 0;
        vm.set('totalYCTC', count);

        const lblBadge = me.lookupReference('lblTongSoYeuCau');
        if (lblBadge && Ext.isFunction(lblBadge.setHtml)) {
            lblBadge.setHtml('Tổng số yêu cầu: <b style="color: #065f46; font-weight: 700;">' + count + '</b>');
        }
    },

    // =========================================================================
    // 1. FORM THÔNG TIN CHUNG (R2) & BOTTOM ACTION BAR (R3)
    // =========================================================================

    /**
     * Xử lý chuyển mạch combobox và textfield khi checkbox "LĐ chưa có tài khoản" thay đổi
     * @param {Ext.form.field.Checkbox} checkbox
     * @param {Boolean} newValue
     */
    onChangeNoLeaderAcc: function (checkbox, newValue) {
        const me = this;
        const vm = me.getViewModel();
        const isChecked = Ext.isDefined(newValue) ? !!newValue : (checkbox && checkbox.getValue());
        const cbbLeader = me.lookupReference('cbbLanhDaoKy') || me.lookupReference('lanhDaoKyCombo');
        const txtLeader = me.lookupReference('txtLanhDaoKy') || me.lookupReference('lanhDaoKyText');

        if (vm) {
            vm.set('thongTinChung.isNoLeaderAcc', isChecked);
        }

        if (isChecked) {
            if (cbbLeader) {
                cbbLeader.hide();
                cbbLeader.setDisabled(true);
            }
            if (txtLeader) {
                txtLeader.show();
                txtLeader.setDisabled(false);
                Ext.defer(function () {
                    if (!txtLeader.destroyed) {
                        txtLeader.focus();
                    }
                }, 50);
            }
        } else {
            if (txtLeader) {
                txtLeader.hide();
                txtLeader.setDisabled(true);
            }
            if (cbbLeader) {
                cbbLeader.show();
                cbbLeader.setDisabled(false);
            }
            if (vm) {
                const currentLeader = vm.get('thongTinChung.lanhDaoKy');
                if (!currentLeader) {
                    vm.set('thongTinChung.lanhDaoKy', 'Nguyễn Thanh Tùng');
                }
            }
        }

        return {
            comboHidden: isChecked,
            textHidden: !isChecked
        };
    },

    onToggleLeaderSelect: function (checkbox, newValue) {
        return this.onChangeNoLeaderAcc(checkbox, newValue);
    },

    /**
     * Phương thức helper kiểm tra tính hợp lệ của Form Thông tin chung
     * @return {Boolean} true nếu hợp lệ, false nếu thiếu trường bắt buộc
     */
    validateFormChung: function () {
        const me = this;
        const vm = me.getViewModel();
        const form = me.lookupReference('formThongTinChung');
        let isValid = true;
        let missingFieldLabel = '';

        if (form && Ext.isFunction(form.isValid)) {
            isValid = form.isValid();
        }

        if (isValid && vm) {
            const d = vm.get('thongTinChung') || {};

            if (!d.loaiCtvbm) {
                isValid = false;
                missingFieldLabel = 'Loại CTVBM';
            } else if (!d.nguonLap) {
                isValid = false;
                missingFieldLabel = 'Nguồn lập';
            } else if (!d.loai) {
                isValid = false;
                missingFieldLabel = 'Loại';
            } else if (!d.heLucLuong) {
                isValid = false;
                missingFieldLabel = 'Hệ lực lượng';
            } else if (!d.linhVucChinh) {
                isValid = false;
                missingFieldLabel = 'Lĩnh vực chính';
            } else if (!d.ngayKy) {
                isValid = false;
                missingFieldLabel = 'Ngày ký';
            } else if (d.isNoLeaderAcc) {
                if (!d.lanhDaoKyText || !d.lanhDaoKyText.trim()) {
                    isValid = false;
                    missingFieldLabel = 'Họ tên Lãnh đạo ký (nhập tay)';
                }
            } else {
                if (!d.lanhDaoKy) {
                    isValid = false;
                    missingFieldLabel = 'Lãnh đạo ký (chọn danh sách)';
                }
            }

            if (isValid) {
                if (!d.nhiemVuCtvbm || !d.nhiemVuCtvbm.trim()) {
                    isValid = false;
                    missingFieldLabel = 'Nhiệm vụ CTVBM';
                } else if (!d.mucDichChinh || !d.mucDichChinh.trim()) {
                    isValid = false;
                    missingFieldLabel = 'Mục đích xây dựng chính';
                }
            }
        }

        if (!isValid) {
            const msg = missingFieldLabel
                ? 'Vui lòng điền thông tin bắt buộc: ' + missingFieldLabel + ' (*)'
                : 'Vui lòng nhập đầy đủ các trường bắt buộc!';

            notiCommon.show({
                message: msg,
                type: 'error'
            });
        }

        return isValid;
    },

    /**
     * Nút "Lưu" đề xuất ở thanh tác vụ chân trang
     */
    onLuu: function () {
        const me = this;
        if (!me.validateFormChung()) {
            return false;
        }

        notiCommon.show({
            message: 'Đã lưu thông tin đề xuất thành công vào hệ thống!',
            type: 'success'
        });
        return true;
    },

    /**
     * Nút "Hoàn thành" đề xuất ở thanh tác vụ chân trang
     */
    onHoanThanh: function () {
        const me = this;
        if (!me.validateFormChung()) {
            return;
        }

        notiCommon.show({
            title: 'Xác nhận',
            message: 'Xác nhận hoàn thành hồ sơ đề xuất này và chuyển cấp thẩm quyền phê duyệt?',
            type: 'confirm',
            confirmText: 'Hoàn thành',
            cancelText: 'Hủy',
            onConfirm: function () {
                notiCommon.show({
                    message: 'Hồ sơ đã được chuyển sang trạng thái "Hoàn thành"!',
                    type: 'success'
                });
            }
        });
    },

    /**
     * Nút "Đóng" đề xuất ở thanh tác vụ chân trang
     */
    onDong: function () {
        const me = this;

        notiCommon.show({
            title: 'Xác nhận',
            message: 'Bạn có muốn đóng màn hình làm việc này? Mọi thay đổi chưa lưu có thể bị mất.',
            type: 'confirm',
            confirmText: 'Đóng',
            cancelText: 'Hủy',
            onConfirm: function () {
                notiCommon.show({
                    message: 'Đã đóng phiên làm việc.',
                    type: 'info'
                });

                const view = me.getView();
                if (view && Ext.isFunction(view.close)) {
                    view.close();
                }
            }
        });
    },

    /**
     * Nút "Gửi phản ánh, góp ý" ở góc trái thanh tác vụ chân trang
     */
    onGuiPhanAnh: function () {
        this.onOpenModalFeedback();
    },

    // =========================================================================
    // 2. BẢNG YÊU CẦU TRA CỨU & GRID INTERACTIONS (R3)
    // =========================================================================

    /**
     * Xử lý click trên ô bảng Grid để mở xem chi tiết mã yêu cầu B5
     */
    onGridCellClick: function (view, td, cellIndex, record, tr, rowIndex, e) {
        if (!e) {
            return;
        }
        const link = e.getTarget ? e.getTarget('.grid-link-mayc') : null;
        if (link && record) {
            if (e.stopEvent) {
                e.stopEvent();
            }
            this.onXemChiTietYCTC(record.get ? record.get('maYC') : record.maYC);
        }
    },

    /**
     * Xóa bản ghi yêu cầu tra cứu trên bảng chính
     * @param {Ext.grid.Panel|Number} gridOrIndex
     * @param {Number} [rowIndex]
     */
    onDeleteRowYCTC: function (gridOrIndex, rowIndex) {
        const me = this;
        const vm = me.getViewModel();
        const store = vm ? vm.getStore('yeuCauTraCuuGridStore') : null;
        if (!store) {
            return;
        }

        let targetIndex = -1;
        let record = null;

        if (typeof gridOrIndex === 'number') {
            targetIndex = gridOrIndex;
            record = store.getAt(targetIndex);
        } else if (gridOrIndex && typeof rowIndex === 'number') {
            targetIndex = rowIndex;
            record = gridOrIndex.getStore ? gridOrIndex.getStore().getAt(rowIndex) : store.getAt(rowIndex);
        }

        if (!record && targetIndex < 0) {
            return;
        }

        notiCommon.show({
            title: 'Xác nhận xóa',
            message: 'Bạn có chắc chắn muốn xóa yêu cầu tra cứu này?',
            type: 'confirm',
            confirmText: 'Xóa',
            cancelText: 'Hủy',
            onConfirm: function () {
                if (record) {
                    store.remove(record);
                } else if (targetIndex >= 0 && targetIndex < store.getCount()) {
                    store.removeAt(targetIndex);
                }
                me.syncTotalCounter();
                notiCommon.show({
                    message: 'Đã xóa yêu cầu tra cứu thành công.',
                    type: 'info'
                });
            }
        });
    },

    /**
     * Mở xem chi tiết yêu cầu tra cứu khi click Hyperlink Mã yêu cầu
     * @param {String|Ext.data.Model} maYCOrRecord
     */
    onXemChiTietYCTC: function (maYCOrRecord) {
        const me = this;
        let record = null;
        let maYC = '';

        if (typeof maYCOrRecord === 'string') {
            maYC = maYCOrRecord;
            const vm = me.getViewModel();
            const store = vm ? vm.getStore('yeuCauTraCuuGridStore') : null;
            if (store) {
                record = store.findRecord('maYC', maYC);
            }
        } else if (maYCOrRecord && maYCOrRecord.get) {
            record = maYCOrRecord;
            maYC = record.get('maYC');
        }

        me.onOpenModalKetQuaB5({
            viewModeOnly: true,
            record: record,
            maYC: maYC
        });
    },

    // =========================================================================
    // 3. MODAL 1: CHỌN CON NGƯỜI (R4)
    // =========================================================================

    /**
     * Mở Window Modal 1: Chọn con người (960x640px)
     */
    onOpenModalChonNguoi: function () {
        const me = this;
        const vm = me.getViewModel();

        if (vm) {
            vm.set('selectedPerson', null);
            vm.set('selectedPersonIndex', null);
            vm.set('btnChonVisible', false);
            vm.set('qrPersonGenerated', false);
            vm.set('btnTaoYctcVisible', false);
            vm.set('searchQuery', {
                hoTen: '',
                gioiTinh: '',
                ngaySinh: '',
                cccd: '',
                hoChieu: ''
            });
        }

        if (me.winChonNguoi && !me.winChonNguoi.destroyed) {
            me.winChonNguoi.destroy();
        }

        me.winChonNguoi = Ext.create('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupChonNguoi', {
            controller: me,
            viewModel: me.getViewModel()
        });
        me.winChonNguoi.show();
    },

    onSearchPersonSpecialKey: function (field, e) {
        if (e && e.getKey && e.getKey() === e.ENTER) {
            this.onSearchPerson();
        }
    },

    /**
     * Tìm kiếm nhân thân theo tiêu chí
     * @param {Object} [criteria]
     */
    onSearchPerson: function (criteria) {
        const me = this;
        const vm = me.getViewModel();
        let queryHoTen = '';

        if (criteria && criteria.hoTen) {
            queryHoTen = criteria.hoTen;
        } else if (me.winChonNguoi) {
            const txtHoTen = me.winChonNguoi.lookupReference('searchHoTen');
            queryHoTen = txtHoTen ? (txtHoTen.getValue() || '') : '';
        } else if (vm) {
            queryHoTen = vm.get('searchQuery.hoTen') || '';
        }

        const normalized = queryHoTen.trim().toLowerCase();
        if (!normalized) {
            notiCommon.show({
                message: 'Vui lòng nhập Họ và tên: "Vũ Tiến Phúc" để tìm kiếm!',
                type: 'info'
            });
            return;
        }

        if (normalized.indexOf('vũ tiến phúc') !== -1 || normalized.indexOf('phúc') !== -1 || normalized.indexOf('phuc') !== -1) {
            if (vm) {
                vm.set('searchQuery.cccd', '0345677843');
                const peopleStore = vm.getStore('mockPeopleStore');
                if (peopleStore) {
                    const mockList = vm.get('mockPeopleData') || [];
                    peopleStore.loadRawData(mockList);
                }
            }

            if (me.winChonNguoi) {
                const txtCccd = me.winChonNguoi.lookupReference('searchCCCD');
                if (txtCccd && Ext.isFunction(txtCccd.setValue)) {
                    txtCccd.setValue('0345677843');
                }
            }

            notiCommon.show({
                message: 'Tìm thấy 2 bản ghi nhân thân phù hợp!',
                type: 'success'
            });
        } else {
            notiCommon.show({
                message: 'Vui lòng nhập Họ và tên: "Vũ Tiến Phúc" để tìm kiếm!',
                type: 'info'
            });
        }
    },

    /**
     * Làm mới form tìm kiếm con người
     */
    onResetSearchPerson: function () {
        const me = this;
        const vm = me.getViewModel();
        if (vm) {
            vm.set('searchQuery', {
                hoTen: '',
                gioiTinh: '',
                ngaySinh: '',
                cccd: '',
                hoChieu: ''
            });
            vm.set('selectedPerson', null);
            vm.set('selectedPersonIndex', null);
            vm.set('btnChonVisible', false);
            vm.set('qrPersonGenerated', false);
            vm.set('btnTaoYctcVisible', false);
        }

        if (me.winChonNguoi) {
            const f1 = me.winChonNguoi.lookupReference('searchHoTen');
            const f2 = me.winChonNguoi.lookupReference('searchGioiTinh');
            const f3 = me.winChonNguoi.lookupReference('searchNgaySinh');
            const f4 = me.winChonNguoi.lookupReference('searchCCCD');
            const f5 = me.winChonNguoi.lookupReference('searchHoChieu');

            if (f1) {
                f1.reset();
            }
            if (f2) {
                f2.reset();
            }
            if (f3) {
                f3.reset();
            }
            if (f4) {
                f4.reset();
            }
            if (f5) {
                f5.reset();
            }

            const grid = me.winChonNguoi.lookupReference('gridKetQuaNhanThan');
            if (grid && grid.getSelectionModel) {
                grid.getSelectionModel().deselectAll();
            }

            const qrContainer = me.winChonNguoi.lookupReference('containerQrPerson');
            if (qrContainer) {
                qrContainer.hide();
            }

            const btnSelect = me.winChonNguoi.lookupReference('btnSelectPerson');
            if (btnSelect) {
                btnSelect.hide();
            }

            const btnCreate = me.winChonNguoi.lookupReference('btnCreateYCTC');
            if (btnCreate) {
                btnCreate.hide();
            }
        }
    },

    /**
     * Thêm mới đối tượng vào kho dữ liệu
     */
    onAddNewPerson: function () {
        notiCommon.show({
            message: 'Chức năng thêm mới dữ liệu đối tượng / nhân thân vào kho dữ liệu.',
            type: 'info'
        });
    },

    onThemMoiDoiTuong: function () {
        return this.onAddNewPerson();
    },

    /**
     * Xem chi tiết nhân thân
     */
    onViewPersonDetail: function () {
        notiCommon.show({
            message: 'Xem chi tiết thông tin nhân thân đối tượng.',
            type: 'info'
        });
    },

    /**
     * Xử lý selectionchange trên bảng kết quả nhân thân
     */
    onPersonSelectionChange: function (selModel, selected) {
        const me = this;
        const vm = me.getViewModel();
        const hasSelection = selected && selected.length > 0;
        const record = hasSelection ? selected[0] : null;

        if (vm) {
            if (hasSelection) {
                const store = vm.getStore('mockPeopleStore');
                const idx = store ? store.indexOf(record) : 0;
                vm.set('selectedPersonIndex', idx);
                vm.set('selectedPerson', record.getData ? record.getData() : record);
                vm.set('btnChonVisible', true);
            } else {
                vm.set('selectedPersonIndex', null);
                vm.set('selectedPerson', null);
                vm.set('btnChonVisible', false);
                vm.set('qrPersonGenerated', false);
                vm.set('btnTaoYctcVisible', false);
            }
        }

        if (me.winChonNguoi) {
            const btnSelect = me.winChonNguoi.lookupReference('btnSelectPerson');
            if (btnSelect) {
                btnSelect.setHidden(!hasSelection);
            }
            if (!hasSelection) {
                const qrContainer = me.winChonNguoi.lookupReference('containerQrPerson');
                if (qrContainer) {
                    qrContainer.hide();
                }
                const btnCreate = me.winChonNguoi.lookupReference('btnCreateYCTC');
                if (btnCreate) {
                    btnCreate.hide();
                }
            }
        }
    },

    /**
     * Xử lý chọn/bỏ chọn dòng trên bảng kết quả nhân thân
     * @param {Number|Ext.data.Model} rowOrRec
     */
    onSelectPersonRow: function (rowOrRec) {
        const me = this;
        const vm = me.getViewModel();
        if (!vm) {
            return;
        }

        const currentIndex = vm.get('selectedPersonIndex');
        let newIndex = null;
        let newRecord = null;

        if (typeof rowOrRec === 'number') {
            newIndex = rowOrRec;
            const store = vm.getStore('mockPeopleStore');
            newRecord = store ? store.getAt(newIndex) : null;
        } else if (rowOrRec && rowOrRec.get) {
            newRecord = rowOrRec;
            const store = vm.getStore('mockPeopleStore');
            newIndex = store ? store.indexOf(newRecord) : 0;
        }

        if (currentIndex === newIndex) {
            // Hủy chọn
            vm.set('selectedPersonIndex', null);
            vm.set('selectedPerson', null);
            vm.set('btnChonVisible', false);
            vm.set('qrPersonGenerated', false);
            vm.set('btnTaoYctcVisible', false);

            if (me.winChonNguoi) {
                const btnSelect = me.winChonNguoi.lookupReference('btnSelectPerson');
                if (btnSelect) {
                    btnSelect.hide();
                }
                const qrContainer = me.winChonNguoi.lookupReference('containerQrPerson');
                if (qrContainer) {
                    qrContainer.hide();
                }
                const btnCreate = me.winChonNguoi.lookupReference('btnCreateYCTC');
                if (btnCreate) {
                    btnCreate.hide();
                }
            }
        } else {
            // Chọn dòng mới
            vm.set('selectedPersonIndex', newIndex);
            vm.set('selectedPerson', newRecord ? newRecord.getData() : {
                hoTen: 'Vũ Tiến Phúc',
                maConNguoi: '8377KGY833'
            });
            vm.set('btnChonVisible', true);

            if (me.winChonNguoi) {
                const btnSelect = me.winChonNguoi.lookupReference('btnSelectPerson');
                if (btnSelect) {
                    btnSelect.show();
                }
            }
        }
    },

    /**
     * Xác nhận chọn con người và sinh mã QR
     */
    onConfirmPersonChoice: function () {
        const me = this;
        const vm = me.getViewModel();
        const selected = vm ? vm.get('selectedPerson') : null;

        if (!selected) {
            notiCommon.show({
                message: 'Vui lòng tích chọn 1 bản ghi trước khi bấm Chọn!',
                type: 'error'
            });
            return false;
        }

        const personCode = selected.maConNguoi || '8377KGY833';
        if (vm) {
            vm.set('generatedPersonCode', personCode);
            vm.set('qrPersonGenerated', true);
            vm.set('btnTaoYctcVisible', true);
        }

        if (me.winChonNguoi) {
            const qrContainer = me.winChonNguoi.lookupReference('containerQrPerson');
            if (qrContainer) {
                qrContainer.show();
            }
            const qrSvgComp = me.winChonNguoi.lookupReference('compPersonQrSvg');
            if (qrSvgComp && Ext.isFunction(qrSvgComp.setHtml)) {
                qrSvgComp.setHtml(me.getPersonQrSvg());
            }
            const btnCreate = me.winChonNguoi.lookupReference('btnCreateYCTC');
            if (btnCreate) {
                btnCreate.show();
            }
        }

        notiCommon.show({
            message: 'Đã xác nhận chọn con người và sinh mã QR!',
            type: 'success'
        });
        return true;
    },

    /**
     * Sao chép mã con người vào clipboard
     */
    onCopyPersonCode: function () {
        const me = this;
        const vm = me.getViewModel();
        const code = vm ? (vm.get('generatedPersonCode') || '8377KGY833') : '8377KGY833';

        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code);
        }

        notiCommon.show({
            message: 'Đã sao chép mã con người: ' + code,
            type: 'success'
        });
    },

    /**
     * Tải mã QR con người SVG
     */
    onDownloadPersonQr: function () {
        const me = this;
        const vm = me.getViewModel();
        const code = vm ? (vm.get('generatedPersonCode') || '8377KGY833') : '8377KGY833';

        notiCommon.show({
            message: 'Đang tải tệp QR_' + code + '.svg...',
            type: 'info'
        });
    },

    /**
     * Chuyển tiếp từ Modal 1 sang Modal 2 (Bấm "Tạo YCTC")
     */
    onNextToB5: function () {
        const me = this;
        const vm = me.getViewModel();
        const code = vm ? vm.get('generatedPersonCode') : null;

        if (!code) {
            notiCommon.show({
                message: 'Vui lòng hoàn thành chọn con người trước!',
                type: 'error'
            });
            return false;
        }

        me.onOpenModalB5();
        return true;
    },

    /**
     * Đóng Modal 1 an toàn
     */
    onCloseModalChonNguoi: function () {
        if (this.winChonNguoi && !this.winChonNguoi.destroyed) {
            this.winChonNguoi.close();
        }
    },

    // =========================================================================
    // 4. MODAL 2: YÊU CẦU TRA CỨU B5 (R4)
    // =========================================================================

    /**
     * Mở Window Modal 2: Yêu cầu tra cứu B5 (740px)
     */
    onOpenModalB5: function () {
        const me = this;
        const vm = me.getViewModel();

        if (vm) {
            const personCode = vm.get('generatedPersonCode');
            if (!personCode) {
                notiCommon.show({
                    message: 'Vui lòng hoàn thành chọn con người trước!',
                    type: 'error'
                });
                return false;
            }

            vm.set('b5Data', {
                mucDichTraCuu: '',
                donViHoSo: {
                    v06: false,
                    pv06: false
                },
                lanhDaoDonVi: '',
                capBac: '',
                chucVu: '',
                noiDungTraCuu: '',
                btnTaoMaYctcVisible: false
            });
            vm.set('b5UnitsSelected', '');
        }

        if (me.winB5 && !me.winB5.destroyed) {
            me.winB5.destroy();
        }

        me.winB5 = Ext.create('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupB5', {
            controller: me,
            viewModel: me.getViewModel()
        });
        me.winB5.show();
        return true;
    },

    /**
     * Chọn lãnh đạo đơn vị -> Tự động điền Cấp bậc ("Thượng tá") & Chức vụ ("Trưởng phòng")
     */
    onSelectLeaderB5: function (leaderNameOrCombo) {
        const me = this;
        const vm = me.getViewModel();
        let leaderName = '';

        if (typeof leaderNameOrCombo === 'string') {
            leaderName = leaderNameOrCombo;
        } else if (leaderNameOrCombo && Ext.isFunction(leaderNameOrCombo.getValue)) {
            leaderName = leaderNameOrCombo.getValue() || '';
        }

        const rank = leaderName ? 'Thượng tá' : '';
        const pos = leaderName ? 'Trưởng phòng' : '';

        if (vm) {
            vm.set('b5Data.lanhDaoDonVi', leaderName);
            vm.set('b5Data.capBac', rank);
            vm.set('b5Data.chucVu', pos);
        }

        if (me.winB5) {
            const txtCapBac = me.winB5.lookupReference('txtCapBacB5');
            const txtChucVu = me.winB5.lookupReference('txtChucVuB5');
            if (txtCapBac && Ext.isFunction(txtCapBac.setValue)) {
                txtCapBac.setValue(rank);
            }
            if (txtChucVu && Ext.isFunction(txtChucVu.setValue)) {
                txtChucVu.setValue(pos);
            }
        }
    },

    onSelectB5Leader: function (combo, newValue) {
        const val = Ext.isDefined(newValue) ? newValue : (combo && Ext.isFunction(combo.getValue) ? combo.getValue() : combo);
        this.onSelectLeaderB5(val);
    },

    /**
     * Tích chọn đơn vị hồ sơ (Multi-select V06 và PV06)
     */
    onChangeDonViHoSoB5: function (combo, newValue) {
        const me = this;
        const vm = me.getViewModel();
        let valStr = '';

        if (Array.isArray(newValue)) {
            valStr = newValue.join('; ');
        } else if (typeof newValue === 'string') {
            valStr = newValue;
        } else if (combo && Ext.isFunction(combo.getValue)) {
            const val = combo.getValue();
            valStr = Array.isArray(val) ? val.join('; ') : (val || '');
        }

        const hasV06 = valStr.indexOf('V06') !== -1;
        const hasPV06 = valStr.indexOf('PV06') !== -1;

        if (vm) {
            vm.set('b5Data.donViHoSo.v06', hasV06);
            vm.set('b5Data.donViHoSo.pv06', hasPV06);
            const parts = [];
            if (hasV06) {
                parts.push('Cục hồ sơ nghiệp vụ V06');
            }
            if (hasPV06) {
                parts.push('Phòng hồ sơ nghiệp vụ PV06');
            }
            vm.set('b5UnitsSelected', parts.join('; '));
        }
    },

    onToggleUnitB5: function (unitKey, isChecked) {
        const me = this;
        const vm = me.getViewModel();
        if (!vm) {
            return;
        }

        vm.set('b5Data.donViHoSo.' + unitKey, !!isChecked);

        const v06 = vm.get('b5Data.donViHoSo.v06');
        const pv06 = vm.get('b5Data.donViHoSo.pv06');
        const parts = [];

        if (v06) {
            parts.push('Cục hồ sơ nghiệp vụ V06');
        }
        if (pv06) {
            parts.push('Phòng hồ sơ nghiệp vụ PV06');
        }

        vm.set('b5UnitsSelected', parts.join('; '));
    },

    /**
     * Lưu phiếu Yêu cầu tra cứu B5
     */
    onSaveB5: function () {
        const me = this;
        const vm = me.getViewModel();
        const b5 = vm ? vm.get('b5Data') : null;

        let mucDich = b5 ? b5.mucDichTraCuu : '';
        let v06 = b5 && b5.donViHoSo ? b5.donViHoSo.v06 : false;
        let pv06 = b5 && b5.donViHoSo ? b5.donViHoSo.pv06 : false;
        let lanhDao = b5 ? b5.lanhDaoDonVi : '';

        if (me.winB5) {
            const cbbMucDich = me.winB5.lookupReference('cbbMucDichB5');
            const cbbDonVi = me.winB5.lookupReference('cbbDonViHoSoB5');
            const cbbLanhDao = me.winB5.lookupReference('cbbLanhDaoB5');

            if (cbbMucDich && Ext.isFunction(cbbMucDich.getValue)) {
                mucDich = cbbMucDich.getValue() || mucDich;
            }
            if (cbbDonVi && Ext.isFunction(cbbDonVi.getValue)) {
                const dvVal = cbbDonVi.getValue();
                const dvStr = Array.isArray(dvVal) ? dvVal.join('; ') : (dvVal || '');
                if (dvStr) {
                    v06 = dvStr.indexOf('V06') !== -1;
                    pv06 = dvStr.indexOf('PV06') !== -1;
                }
            }
            if (cbbLanhDao && Ext.isFunction(cbbLanhDao.getValue)) {
                lanhDao = cbbLanhDao.getValue() || lanhDao;
            }
        }

        if (!mucDich) {
            notiCommon.show({
                message: 'Vui lòng chọn Mục đích tra cứu!',
                type: 'error'
            });
            return false;
        }

        if (!v06 && !pv06) {
            notiCommon.show({
                message: 'Vui lòng chọn ít nhất 1 Đơn vị hồ sơ!',
                type: 'error'
            });
            return false;
        }

        if (!lanhDao) {
            notiCommon.show({
                message: 'Vui lòng chọn Lãnh đạo đơn vị!',
                type: 'error'
            });
            return false;
        }

        if (vm) {
            vm.set('b5Data.btnTaoMaYctcVisible', true);
        }

        if (me.winB5) {
            const btnGen = me.winB5.lookupReference('btnGenerateYCTC');
            if (btnGen) {
                btnGen.show();
            }
        }

        notiCommon.show({
            message: 'Đã lưu thông tin Yêu cầu tra cứu B5 thành công!',
            type: 'success'
        });
        return true;
    },

    /**
     * Bấm "Tạo mã YCTC" chuyển từ Modal 2 sang Modal 3
     */
    onGenerateYctcB5: function () {
        const me = this;
        const vm = me.getViewModel();
        const canGen = vm ? vm.get('b5Data.btnTaoMaYctcVisible') : false;

        if (!canGen) {
            notiCommon.show({
                message: 'Vui lòng Lưu trước khi tạo mã YCTC!',
                type: 'error'
            });
            return false;
        }

        if (me.winB5 && !me.winB5.destroyed) {
            me.winB5.hide();
        }

        me.onOpenModalKetQuaB5({
            viewModeOnly: false
        });

        notiCommon.show({
            message: 'Đã tạo mã YCTC thành công! Chuyển sang màn hình kết quả tra cứu.',
            type: 'success'
        });
        return true;
    },

    onGenerateYCTC: function () {
        return this.onGenerateYctcB5();
    },

    /**
     * Đóng Modal 2 an toàn
     */
    onCloseModalB5: function () {
        if (this.winB5 && !this.winB5.destroyed) {
            this.winB5.close();
        }
    },

    // =========================================================================
    // 5. MODAL 3: KẾT QUẢ YCTC B5 (R4)
    // =========================================================================

    /**
     * Mở Window Modal 3: Thông tin yêu cầu tra cứu B5 (840px)
     * @param {Object} [config] { viewModeOnly: Boolean, record: Model, maYC: String }
     */
    onOpenModalKetQuaB5: function (config) {
        const me = this;
        const vm = me.getViewModel();
        config = config || {};
        const isViewMode = !!config.viewModeOnly;

        if (vm) {
            vm.set('modal3Config.viewModeOnly', isViewMode);
            vm.set('modal3Config.btnHoanThanhVisible', !isViewMode);

            if (isViewMode && config.record) {
                const donViHS = config.record.get ? (config.record.get('donViHS') || '') : (config.record.donViHS || '');
                const maYC = config.record.get ? (config.record.get('maYC') || '') : (config.record.maYC || '');

                const hasV06 = donViHS.indexOf('V06') !== -1 || maYC === '8377KGY834';
                const hasPV06 = donViHS.indexOf('PV06') !== -1 || maYC === '8377KGY836';

                vm.set('modal3Config.blockV06Visible', hasV06);
                vm.set('modal3Config.codeV06', hasV06 ? '8377KGY834' : null);
                vm.set('modal3Config.blockPV06Visible', hasPV06);
                vm.set('modal3Config.codePV06', hasPV06 ? '8377KGY836' : null);
                vm.set('modal3Config.personCode', '8377KGY833');
            } else {
                const v06 = vm.get('b5Data.donViHoSo.v06');
                const pv06 = vm.get('b5Data.donViHoSo.pv06');
                const personCode = vm.get('generatedPersonCode') || '8377KGY833';

                vm.set('modal3Config.personCode', personCode);
                vm.set('modal3Config.blockV06Visible', !!v06);
                vm.set('modal3Config.codeV06', v06 ? '8377KGY834' : null);
                vm.set('modal3Config.blockPV06Visible', !!pv06);
                vm.set('modal3Config.codePV06', pv06 ? '8377KGY836' : null);
            }
        }

        if (me.winKetQuaB5 && !me.winKetQuaB5.destroyed) {
            me.winKetQuaB5.destroy();
        }

        me.winKetQuaB5 = Ext.create('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupKetQuaB5', {
            controller: me,
            viewModel: me.getViewModel()
        });

        const showBlockV06 = vm ? !(!vm.get('modal3Config.blockV06Visible')) : false;
        const showBlockPV06 = vm ? !(!vm.get('modal3Config.blockPV06Visible')) : false;

        const blockV06 = me.winKetQuaB5.lookupReference('blockV06');
        if (blockV06) {
            blockV06.setHidden(!showBlockV06);
        }

        const blockPV06 = me.winKetQuaB5.lookupReference('blockPV06');
        if (blockPV06) {
            blockPV06.setHidden(!showBlockPV06);
        }

        const btnComplete = me.winKetQuaB5.lookupReference('btnCompleteYCTCResult');
        if (btnComplete) {
            btnComplete.setHidden(isViewMode);
        }

        // Render QR SVG contents into components
        Ext.defer(function () {
            if (!me.winKetQuaB5 || me.winKetQuaB5.destroyed) {
                return;
            }
            const personSvg = me.winKetQuaB5.lookupReference('compResultPersonQrSvg');
            if (personSvg && Ext.isFunction(personSvg.setHtml)) {
                personSvg.setHtml(me.getPersonQrSvg());
            }
            const v06Svg = me.winKetQuaB5.lookupReference('compV06QrSvg');
            if (v06Svg && Ext.isFunction(v06Svg.setHtml)) {
                v06Svg.setHtml(me.getV06QrSvg());
            }
            const pv06Svg = me.winKetQuaB5.lookupReference('compPV06QrSvg');
            if (pv06Svg && Ext.isFunction(pv06Svg.setHtml)) {
                pv06Svg.setHtml(me.getPV06QrSvg());
            }

            const defBlockV06 = me.winKetQuaB5.lookupReference('blockV06');
            if (defBlockV06) {
                defBlockV06.setHidden(!showBlockV06);
            }
            const defBlockPV06 = me.winKetQuaB5.lookupReference('blockPV06');
            if (defBlockPV06) {
                defBlockPV06.setHidden(!showBlockPV06);
            }

            const defBtnComplete = me.winKetQuaB5.lookupReference('btnCompleteYCTCResult');
            if (defBtnComplete) {
                defBtnComplete.setHidden(isViewMode);
            }
        }, 50);

        me.winKetQuaB5.show();
    },

    /**
     * Copy V06 Code
     */
    onCopyV06Code: function () {
        const code = '8377KGY834';
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code);
        }
        notiCommon.show({
            message: 'Đã sao chép mã YCTC V06: ' + code,
            type: 'success'
        });
    },

    /**
     * Download V06 QR
     */
    onDownloadV06Qr: function () {
        notiCommon.show({
            message: 'Đang tải tệp QR_8377KGY834.svg...',
            type: 'info'
        });
    },

    /**
     * Copy PV06 Code
     */
    onCopyPV06Code: function () {
        const code = '8377KGY836';
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code);
        }
        notiCommon.show({
            message: 'Đã sao chép mã YCTC PV06: ' + code,
            type: 'success'
        });
    },

    /**
     * Download PV06 QR
     */
    onDownloadPV06Qr: function () {
        notiCommon.show({
            message: 'Đang tải tệp QR_8377KGY836.svg...',
            type: 'info'
        });
    },

    /**
     * Nút "Xem biểu mẫu"
     */
    onXemBieuMau: function () {
        notiCommon.show({
            message: 'Đang mở biểu mẫu Yêu cầu tra cứu B5...',
            type: 'info'
        });
    },

    onViewTemplateB5: function () {
        return this.onXemBieuMau();
    },

    /**
     * Nút "Tải YCTC"
     */
    onTaiYCTC: function () {
        const me = this;
        const vm = me.getViewModel();
        const code = vm ? (vm.get('modal3Config.personCode') || '8377KGY833') : '8377KGY833';

        notiCommon.show({
            message: 'Đang tải tệp HoSo_YCTC_B5_' + code + '.txt...',
            type: 'info'
        });
    },

    onDownloadYCTCFile: function () {
        return this.onTaiYCTC();
    },

    /**
     * Nút "Hoàn thành" trong Modal 3: Chèn bản ghi vào bảng chính và đóng mọi modal
     */
    onHoanThanhModal3: function () {
        const me = this;
        const vm = me.getViewModel();
        if (!vm) {
            return false;
        }

        const isViewMode = vm.get('modal3Config.viewModeOnly');
        if (isViewMode) {
            return false;
        }

        const store = vm.getStore('yeuCauTraCuuGridStore');
        if (!store) {
            return false;
        }

        const cfg = vm.get('modal3Config') || {};
        const b5 = vm.get('b5Data') || {};
        let addedCount = 0;

        if (cfg.blockV06Visible && cfg.codeV06) {
            const exists = store.findRecord('maYC', cfg.codeV06);
            if (!exists) {
                store.add({
                    stt: store.getCount() + 1,
                    maYC: cfg.codeV06,
                    donViYC: 'Lực lượng Văn phòng CQCSĐT',
                    donViHS: 'Cục hồ sơ nghiệp vụ V06',
                    mucDich: b5.mucDichTraCuu || 'Đặc tình',
                    ngayTao: '09/06/2026',
                    ngayNhan: '-',
                    trangThai: 'Chờ tiếp nhận',
                    lyDo: '-'
                });
                addedCount++;
            }
        }

        if (cfg.blockPV06Visible && cfg.codePV06) {
            const exists = store.findRecord('maYC', cfg.codePV06);
            if (!exists) {
                store.add({
                    stt: store.getCount() + 1,
                    maYC: cfg.codePV06,
                    donViYC: 'Lực lượng Văn phòng CQCSĐT',
                    donViHS: 'Phòng hồ sơ nghiệp vụ PV06',
                    mucDich: b5.mucDichTraCuu || 'Đặc tình',
                    ngayTao: '09/06/2026',
                    ngayNhan: '-',
                    trangThai: 'Chờ tiếp nhận',
                    lyDo: '-'
                });
                addedCount++;
            }
        }

        me.syncTotalCounter();
        me.closeAllModals();

        notiCommon.show({
            message: 'Đã hoàn thành tạo Yêu cầu tra cứu B5 (' + addedCount + ' yêu cầu) với trạng thái "Chờ tiếp nhận"!',
            type: 'success'
        });
        return true;
    },

    onCompleteYCTCResult: function () {
        return this.onHoanThanhModal3();
    },

    /**
     * Đóng toàn bộ cả 3 modal liên hoàn
     */
    closeAllModals: function () {
        const me = this;
        if (me.winKetQuaB5 && !me.winKetQuaB5.destroyed) {
            me.winKetQuaB5.close();
        }
        if (me.winB5 && !me.winB5.destroyed) {
            me.winB5.close();
        }
        if (me.winChonNguoi && !me.winChonNguoi.destroyed) {
            me.winChonNguoi.close();
        }
    },

    /**
     * Đóng Modal 3 an toàn
     */
    onCloseModalKetQuaB5: function () {
        if (this.winKetQuaB5 && !this.winKetQuaB5.destroyed) {
            this.winKetQuaB5.close();
        }
    },

    // =========================================================================
    // 6. MODAL 4: GỬI PHẢN ÁNH, GÓP Ý
    // =========================================================================

    /**
     * Mở Window Modal 4: Gửi phản ánh, góp ý
     */
    onOpenModalFeedback: function () {
        const me = this;
        const vm = me.getViewModel();

        if (vm) {
            vm.set('feedbackData.tieuDe', '');
            vm.set('feedbackData.noiDung', '');
        }

        if (me.winFeedback && !me.winFeedback.destroyed) {
            me.winFeedback.destroy();
        }

        me.winFeedback = Ext.create('DEMO.view.pages.DeXuatCTVBM.DeXuatCTVBM_ViewPopupFeedback', {
            controller: me,
            viewModel: me.getViewModel()
        });
        me.winFeedback.show();
    },

    /**
     * Gửi phản ánh / góp ý
     * @param {Ext.button.Button|String} [btnOrTitle]
     * @param {String} [maybeContent]
     */
    onSubmitFeedback: function (btnOrTitle, maybeContent) {
        const me = this;
        const vm = me.getViewModel();
        let title = '';
        let content = '';

        if (typeof btnOrTitle === 'string') {
            title = btnOrTitle;
            content = maybeContent || '';
        } else {
            const win = me.winFeedback;
            const txtTitle = win ? win.lookupReference('txtFeedbackTieuDe') : me.lookupReference('txtFeedbackTieuDe');
            const txtContent = win ? win.lookupReference('txtFeedbackNoiDung') : me.lookupReference('txtFeedbackNoiDung');

            title = txtTitle ? (txtTitle.getValue() || '') : (vm ? vm.get('feedbackData.tieuDe') || '' : '');
            content = txtContent ? (txtContent.getValue() || '') : (vm ? vm.get('feedbackData.noiDung') || '' : '');
        }

        if (vm) {
            vm.set('feedbackData.tieuDe', title);
            vm.set('feedbackData.noiDung', content);
        }

        if (!content || !content.trim()) {
            notiCommon.show({
                message: 'Vui lòng nhập nội dung góp ý!',
                type: 'error'
            });
            return false;
        }

        if (me.winFeedback && !me.winFeedback.destroyed) {
            me.winFeedback.close();
        } else if (btnOrTitle && btnOrTitle.up) {
            const win = btnOrTitle.up('window');
            if (win) {
                win.close();
            }
        }

        if (vm) {
            vm.set('feedbackData.tieuDe', '');
            vm.set('feedbackData.noiDung', '');
        }

        notiCommon.show({
            message: 'Cảm ơn bạn! Phản ánh đã được gửi thành công.',
            type: 'success'
        });
        return true;
    },

    /**
     * Đóng Modal 4
     * @param {Ext.button.Button} [btn]
     */
    onCloseFeedback: function (btn) {
        const me = this;
        if (me.winFeedback && !me.winFeedback.destroyed) {
            me.winFeedback.close();
        } else if (btn && btn.up) {
            const win = btn.up('window');
            if (win) {
                win.close();
            }
        }

        const vm = me.getViewModel();
        if (vm) {
            vm.set('feedbackData.tieuDe', '');
            vm.set('feedbackData.noiDung', '');
        }
    },

    // =========================================================================
    // 7. QR CODE VECTOR SVG GENERATORS
    // =========================================================================

    getPersonQrSvg: function () {
        return '<svg viewBox="0 0 100 100" style="width:96px;height:96px;" fill="#1f2937">' +
            '<path d="M5,5 h30 v30 h-30 z M10,10 v20 h20 v-20 z M15,15 h10 v10 h-10 z" />' +
            '<path d="M65,5 h30 v30 h-30 z M70,10 v20 h20 v-20 z M75,15 h10 v10 h-10 z" />' +
            '<path d="M5,65 h30 v30 h-30 z M10,70 v20 h20 v-20 z M15,75 h10 v10 h-10 z" />' +
            '<rect x="42" y="10" width="7" height="7"/>' +
            '<rect x="52" y="10" width="6" height="6"/>' +
            '<rect x="45" y="22" width="10" height="6"/>' +
            '<rect x="10" y="42" width="7" height="8"/>' +
            '<rect x="22" y="45" width="8" height="6"/>' +
            '<rect x="38" y="38" width="7" height="7"/>' +
            '<rect x="52" y="38" width="8" height="8"/>' +
            '<rect x="68" y="42" width="12" height="7"/>' +
            '<rect x="85" y="42" width="7" height="8"/>' +
            '<rect x="42" y="52" width="6" height="15"/>' +
            '<rect x="55" y="55" width="10" height="7"/>' +
            '<rect x="70" y="55" width="10" height="10"/>' +
            '<rect x="85" y="55" width="7" height="12"/>' +
            '<rect x="42" y="75" width="15" height="15"/>' +
            '<rect x="65" y="72" width="12" height="6"/>' +
            '<rect x="82" y="75" width="10" height="10"/>' +
            '<rect x="65" y="85" width="8" height="8"/>' +
            '</svg>';
    },

    getV06QrSvg: function () {
        return '<svg viewBox="0 0 100 100" style="width:96px;height:96px;" fill="#1f2937">' +
            '<path d="M5,5 h30 v30 h-30 z M10,10 v20 h20 v-20 z M15,15 h10 v10 h-10 z" />' +
            '<path d="M65,5 h30 v30 h-30 z M70,10 v20 h20 v-20 z M75,15 h10 v10 h-10 z" />' +
            '<path d="M5,65 h30 v30 h-30 z M10,70 v20 h20 v-20 z M15,75 h10 v10 h-10 z" />' +
            '<rect x="42" y="15" width="8" height="8"/>' +
            '<rect x="52" y="25" width="6" height="6"/>' +
            '<rect x="42" y="38" width="7" height="7"/>' +
            '<rect x="52" y="45" width="8" height="8"/>' +
            '<rect x="68" y="42" width="12" height="7"/>' +
            '<rect x="85" y="42" width="7" height="8"/>' +
            '<rect x="42" y="55" width="8" height="15"/>' +
            '<rect x="55" y="58" width="10" height="7"/>' +
            '<rect x="70" y="58" width="10" height="10"/>' +
            '<rect x="82" y="72" width="10" height="10"/>' +
            '<rect x="42" y="78" width="12" height="12"/>' +
            '<rect x="65" y="85" width="8" height="8"/>' +
            '</svg>';
    },

    getPV06QrSvg: function () {
        return '<svg viewBox="0 0 100 100" style="width:96px;height:96px;" fill="#1f2937">' +
            '<path d="M5,5 h30 v30 h-30 z M10,10 v20 h20 v-20 z M15,15 h10 v10 h-10 z" />' +
            '<path d="M65,5 h30 v30 h-30 z M70,10 v20 h20 v-20 z M75,15 h10 v10 h-10 z" />' +
            '<path d="M5,65 h30 v30 h-30 z M10,70 v20 h20 v-20 z M15,75 h10 v10 h-10 z" />' +
            '<rect x="42" y="10" width="7" height="7"/>' +
            '<rect x="52" y="18" width="8" height="6"/>' +
            '<rect x="15" y="42" width="7" height="8"/>' +
            '<rect x="38" y="38" width="7" height="7"/>' +
            '<rect x="55" y="42" width="8" height="8"/>' +
            '<rect x="75" y="42" width="10" height="7"/>' +
            '<rect x="85" y="42" width="7" height="8"/>' +
            '<rect x="45" y="52" width="6" height="15"/>' +
            '<rect x="55" y="65" width="10" height="7"/>' +
            '<rect x="70" y="65" width="10" height="10"/>' +
            '<rect x="85" y="60" width="7" height="12"/>' +
            '<rect x="42" y="80" width="15" height="10"/>' +
            '<rect x="65" y="80" width="12" height="6"/>' +
            '<rect x="82" y="80" width="10" height="10"/>' +
            '</svg>';
    },

    // =========================================================================
    // 8. HEADER UTILITIES & USER ACTIONS
    // =========================================================================

    onQuickUtilityClick: function (btn) {
        const title = (btn && btn.tooltip) || 'Tiện ích';
        notiCommon.show({
            message: 'Đang mở tiện ích: ' + title,
            type: 'info'
        });
    },

    onUserLogout: function () {
        notiCommon.show({
            title: 'Xác nhận đăng xuất',
            message: 'Xác nhận đăng xuất khỏi hệ thống?',
            type: 'confirm',
            confirmText: 'Đăng xuất',
            cancelText: 'Hủy',
            onConfirm: function () {
                notiCommon.show({
                    message: 'Đã đăng xuất khỏi hệ thống.',
                    type: 'info'
                });
            }
        });
    }
});

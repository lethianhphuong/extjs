---
name: extjs-verify
description: Chọn và thực hiện kiểm tra phù hợp cho thay đổi DEMO ExtJS trước bàn giao hoặc khi người dùng yêu cầu xác minh. Dùng cho source và UI ExtJS; không chạy build/test trong lượt task-brief chỉ đọc.
---

# Xác minh thay đổi ExtJS

Đọc [AGENTS.md](../../../AGENTS.md) và các mục liên quan của [CONVENTIONS.md](../../../CONVENTIONS.md). Chọn kiểm tra theo diff và rủi ro; không chạy mọi lệnh cho mọi task. Review chỉ đọc không tự cho phép sửa code; xử lý lỗi theo phạm vi người dùng đã giao.

## Vòng kiểm tra → sửa → kiểm tra lại

- Sau khi code, phải thực thi kiểm tra phù hợp; với giao diện/luồng ExtJS phải chạy ứng dụng và thử luồng bị ảnh hưởng, kiểm tra console và request liên quan. Chỉ đọc code, lint hoặc build không đủ để kết luận UI chạy được.
- Trong task triển khai đã được duyệt, lỗi do thay đổi hoặc ngăn chức năng được giao hoạt động phải được chẩn đoán và sửa trong phạm vi, sau đó chạy lại kiểm tra thất bại và kiểm tra liên quan đến khi đạt. Không chỉ ghi lỗi rồi dừng khi vẫn có thể sửa; không cần xin phép lại cho mỗi vòng. Review chỉ đọc vẫn chỉ báo phát hiện.
- Nếu thiếu công cụ/backend/dữ liệu/quyền truy cập hoặc lỗi ngoài phạm vi chặn việc xác minh, chạy phần còn khả thi, báo nguyên nhân và điều kiện tiếp tục. Không lặp cùng lệnh khi điều kiện không đổi, không tự mở rộng phạm vi hoặc báo hoàn tất kiểm chứng.
- Báo cả lỗi đã sửa và kết quả chạy lại; phân biệt kết quả thực thi với phần mới chỉ review.

## Kiểm tra source và liên kết

- Namespace khớp đường dẫn; xtype đúng tên file, không trùng; alias nối đúng Controller/ViewModel; requires tồn tại và nạp được.
- Handler/listener resolve đúng Controller; reference duy nhất trong phạm vi; store/data/formulas khớp binding và ViewModel sở hữu.
- Component độc lập đủ MVVM/folder; khối trình bày không có bộ ba rỗng. Field khai báo trực tiếp; không initComponent/init thừa hoặc config lặp override.
- Page mới/di chuyển file: navigation route + component, requires, nơi dùng và SCSS đã cập nhật, không route map trùng.
- API: đối chiếu URL/method/payload/reader/phân trang/ngày giờ/lỗi với contract có sẵn. Mock/test frontend không chứng minh backend hoạt động.
- Đọc diff cuối, phân biệt thay đổi task và thay đổi sẵn có; không chỉnh SDK/vendor hoặc output ngoài phạm vi.

## Chọn lệnh

- Dự án đã cài đặt ESLint v8 tương thích `.eslintrc.json`: chạy `npx eslint <file.js>` (hoặc `npm run lint`) trên các file JS thay đổi, dùng `--fix` (`npm run lint:fix`) để tự động sửa các lỗi format như nháy đơn, chấm phẩy, trailing comma. Không quét SDK.
- Có Node: `node --check <file.js>` cho file JS thay đổi, xác minh cú pháp trước khi chạy ExtJS runtime/binding.
- Khi đổi ConNguoiLienQuan/ComBoDiaChi, đọc `scripts/check-con-nguoi.cjs`, rồi cân nhắc `node scripts/check-con-nguoi.cjs`. Script chỉ kiểm tra một số bất biến/hành vi của nhóm này, không đại diện toàn app.
- Đọc test liên quan trong tests/ để biết runner, dữ liệu, môi trường trước khi chạy; không giả định folder có nghĩa runner đã sẵn sàng.
- Sencha Cmd và build: **Tuyệt đối KHÔNG tự động chạy các lệnh build** (`sencha app build`, `sencha app build classic`, build dev/prod...) trừ khi người dùng có lệnh yêu cầu rõ ràng. Lệnh build sẽ sinh ra hàng loạt file rác đè lên `build/` và `classic.jsonp`. Chỉ chạy watch/server khi thực sự cần thử nghiệm UI trong phạm vi được giao.

## Kiểm tra UI theo thay đổi

- Navigation: menu/hash, mở trực tiếp/tải lại trang, quay lại view được cache.
- Form: nhập/reset/binding, validation, dấu sao bắt buộc, padding5 một lần; chiều rộng cột qua container và kích thước cửa sổ liên quan.
- Popup: mở/đóng/mở lại, truyền dữ liệu/kết quả, phạm vi handler, validation, cleanup tài nguyên riêng.
- Grid: lọc/reset, paging, trạng thái rỗng, row actions và dữ liệu hiển thị.
- UI tiếng Việt có dấu; light/dark khi sửa style; loading/lỗi/xác nhận dùng notiCommon khi sửa luồng API/thông báo.

Không báo UI pass nếu chưa chạy ứng dụng. Nếu thiếu môi trường, nêu thao tác cần kiểm tra thủ công và phần source đã review.

## Báo cáo

Nêu hành vi/file đã đổi, lệnh/thao tác đã chạy và kết quả, lỗi còn lại và phần chưa kiểm tra kèm lý do. Phân biệt cú pháp, lint, test có mock, build, UI; không gộp thành “đã test toàn bộ”.

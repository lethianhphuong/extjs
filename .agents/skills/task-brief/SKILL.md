---
name: task-brief
description: Chuẩn hóa yêu cầu lớn hoặc chưa rõ của DEMO ExtJS thành brief và checklist triển khai. Dùng khi người dùng gọi task-brief, /task-brief hoặc yêu cầu lập brief trước; không tự áp dụng cổng brief cho sửa đổi nhỏ đã rõ.
---

# Lập brief cho DEMO ExtJS

## Phạm vi lượt brief

Chỉ đọc và phân tích; không sửa file project, chạy formatter, generator, cài dependency, build tạo output, khởi động server hoặc thao tác bên ngoài. Trình bày brief trong chat.

Sau brief, dừng để người dùng duyệt. Chỉ triển khai khi có lời cho phép rõ ràng sau brief, như “ok”, “đồng ý triển khai”, “làm theo brief”. Yêu cầu ban đầu và việc có checklist không phải quyền triển khai trong lượt brief. Khi đã được duyệt, không xin lại cho từng bước nằm trong brief đó.

## Khảo sát

Đọc [AGENTS.md](../../../AGENTS.md), phần liên quan của [CONVENTIONS.md](../../../CONVENTIONS.md) và [CLAUDE.md](../../../CLAUDE.md). Đối chiếu implementation; xử lý ví dụ legacy theo AGENTS.md.

- Xác định màn hình/popup/component và bộ MVVM sở hữu. Tham khảo `classic/src/view/pages/ConNguoiLienQuan/` về folder, `ConNguoiDemo2/` về form khai báo trực tiếp.
- Chọn View trực tiếp là Grid hoặc Container với component con theo mục 1.1.1–1.1.2.
- Truy vết namespace, xtype/alias, requires, references, binding/store, navigation trong MainModel/MainController và SCSS theo namespace.
- Đọc override/helper liên quan để tránh cấu hình lặp. Khi có API, kiểm tra contract; phân biệt dữ liệu mẫu và dữ liệu thật.
- Chỉ hỏi thông tin thiếu làm thay đổi đáng kể UX, dữ liệu, contract hoặc phạm vi; nêu rõ giả định kỹ thuật có thể đảo ngược.

## Brief đầu ra

1. Mục tiêu và hành vi mong muốn.
2. Phạm vi và phần không thực hiện.
3. File dự kiến tạo/sửa, trách nhiệm MVVM, lựa chọn cấu trúc View và component dùng chung.
4. Tác động dependencies, navigation, binding/store, overrides, style và API contract nếu có.
5. Checklist triển khai theo thứ tự phụ thuộc, gắn tiêu chí nghiệm thu và khảo sát còn thiếu.
6. Cách xác minh dự kiến: cú pháp/lint, kiểm tra hiện có phù hợp, thao tác UI và build nếu cần; điều kiện môi trường và giới hạn.
7. Rủi ro, giả định và quyết định còn mở.

Checklist triển khai phải bao gồm thực thi kiểm tra để xác minh code chạy được, thử runtime/UI cho luồng giao diện bị ảnh hưởng và vòng sửa lỗi → chạy lại đến khi đạt trong phạm vi task. Nêu điều kiện môi trường cần có và cách báo phần bị chặn; chỉ lập kế hoạch cho các bước này, không thực hiện trong lượt brief.

Kết thúc bằng yêu cầu duyệt brief và dừng. Không thực hiện checklist trong lượt lập brief.

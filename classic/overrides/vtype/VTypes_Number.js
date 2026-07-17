
Ext.define('DEMO.override.vtype.VTypes_Number', {
    override: 'Ext.form.field.VTypes',

    number: function (value, field) {
        let numberText = 'Thông tin nhập vào chỉ được nhập số (0-9)';

        let check = this.numberRe.test(value);
        if (check) {
            let minValue = field.minValue;
            let maxValue = field.maxValue;
            let minText = `Thông tin nhập vào không nhỏ hơn giá trị cho phép (${minValue})`;
            let maxText = `Thông tin nhập vào không lớn hơn giá trị cho phép (${maxValue})`;
            let num = parseInt(value);
            if (minValue != null) {
                if (num < minValue) {
                    this.numberText = minText;
                    return false;
                }
            }
            if (maxValue != null) {
                if (num > maxValue) {
                    this.numberText = maxText;
                    return false;
                }
            }
        }
        else {
            this.numberText = numberText;
        }
        return check;
    },
    numberRe: /^\d*$/,
    numberText: 'Thông tin nhập vào chỉ được nhập số (0-9)'
});
export class StringUtil {
  static toUrlPath(str: string): string {
    return StringUtil.removeVietnameseSigns(str)
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  static removeVietnameseSigns(str: string): string {
    const vietnameseSigns = {
      a: 'áàảãạâấầẩẫậăắằẳẵặÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ',
      d: 'đĐ',
      e: 'éèẻẽẹêếềểễệÉÈẺẼẸÊẾỀỂỄỆ',
      i: 'íìỉĩịÍÌỈĨỊ',
      o: 'óòỏõọôốồổỗộơớờởỡợÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ',
      u: 'úùủũụưứừửữựÚÙỦŨỤƯỨỪỬỮỰ',
      y: 'ýỳỷỹỵÝỲỶỸỴ',
    };

    for (const [key, value] of Object.entries(vietnameseSigns)) {
      const regex = new RegExp(`[${value}]`, 'g');
      str = str.replace(regex, (match) => {
        // Preserve case
        return match === match.toUpperCase() ? key.toUpperCase() : key;
      });
    }

    return str;
  }
}

import { StringUtil } from './string.util';

describe('StringUtil', () => {
  describe('removeVietnameseSigns', () => {
    it('should remove Vietnamese signs from a string (lowercase)', () => {
      expect(StringUtil.removeVietnameseSigns('áàảãạâấầẩẫậăắằẳẵặ')).toBe(
        'aaaaaaaaaaaaaaaaa'
      );
      expect(StringUtil.removeVietnameseSigns('đ')).toBe('d');
      expect(StringUtil.removeVietnameseSigns('éèẻẽẹêếềểễệ')).toBe(
        'eeeeeeeeeee'
      );
      expect(StringUtil.removeVietnameseSigns('íìỉĩị')).toBe('iiiii');
      expect(StringUtil.removeVietnameseSigns('óòỏõọôốồổỗộơớờởỡợ')).toBe(
        'ooooooooooooooooo'
      );
      expect(StringUtil.removeVietnameseSigns('úùủũụưứừửữự')).toBe(
        'uuuuuuuuuuu'
      );
      expect(StringUtil.removeVietnameseSigns('ýỳỷỹỵ')).toBe('yyyyy');
      expect(StringUtil.removeVietnameseSigns('xin chào việt nam!')).toBe(
        'xin chao viet nam!'
      );
    });
    it('should remove Vietnamese signs from a string (uppercase)', () => {
      expect(StringUtil.removeVietnameseSigns('ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ')).toBe(
        'AAAAAAAAAAAAAAAAA'
      );
      expect(StringUtil.removeVietnameseSigns('Đ')).toBe('D');
      expect(StringUtil.removeVietnameseSigns('ÉÈẺẼẸÊẾỀỂỄỆ')).toBe(
        'EEEEEEEEEEE'
      );
      expect(StringUtil.removeVietnameseSigns('ÍÌỈĨỊ')).toBe('IIIII');
      expect(StringUtil.removeVietnameseSigns('ÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ')).toBe(
        'OOOOOOOOOOOOOOOOO'
      );
      expect(StringUtil.removeVietnameseSigns('ÚÙỦŨỤƯỨỪỬỮỰ')).toBe(
        'UUUUUUUUUUU'
      );
      expect(StringUtil.removeVietnameseSigns('ÝỲỶỸỴ')).toBe('YYYYY');
      expect(StringUtil.removeVietnameseSigns('XIN CHÀO VIỆT NAM!')).toBe(
        'XIN CHAO VIET NAM!'
      );
    });
    it('should preserve case for mixed input', () => {
      expect(StringUtil.removeVietnameseSigns('Xin Chào Việt Nam!')).toBe(
        'Xin Chao Viet Nam!'
      );
      expect(StringUtil.removeVietnameseSigns('Đường ĐẾN thành CÔNG')).toBe(
        'Duong DEN thanh CONG'
      );
    });
  });

  describe('toUrlPath', () => {
    it('should convert string to url path', () => {
      expect(StringUtil.toUrlPath('Xin chào Việt Nam')).toBe(
        'xin-chao-viet-nam'
      );
      expect(StringUtil.toUrlPath('Đường đến thành công')).toBe(
        'duong-den-thanh-cong'
      );
      expect(StringUtil.toUrlPath('Cà phê sữa đá')).toBe('ca-phe-sua-da');
      expect(StringUtil.toUrlPath('  Nhiều   khoảng   trắng  ')).toBe(
        'nhieu-khoang-trang'
      );
    });
    it('should handle uppercase Vietnamese input', () => {
      expect(StringUtil.toUrlPath('XIN CHÀO VIỆT NAM')).toBe(
        'xin-chao-viet-nam'
      );
    });
  });
});

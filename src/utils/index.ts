export function generateUUID(): string {
  // 生成符合 UUID v4 标准的随机 UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}



// 获取当前日期和时间的格式化字符串
export function getNowDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = padZero(now.getMonth() + 1);
  const day = padZero(now.getDate());
  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function padZero(num: number): string {
  return num < 10 ? `0${num}` : num.toString();
}

// 验证邮箱格式
export function validateEmail(email: string): boolean {
  const reg =
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return reg.test(email);
}

// 验证手机号格式
export function validatePhone(phone: string): boolean {
  const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
  return reg.test(phone);
}

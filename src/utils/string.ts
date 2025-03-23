import { Footer } from '@/interface/footer/footer'
import { tableQLTinTuc_CauHinhDataType } from '@/interface/QLTinTuc_CauHinh/QLTinTuc_CauHinh'
import { v4 as uuidv4 } from 'uuid'

function createSlug(title: string): string {
  const uniqueId =
    uuidv4().slice(0, 8) + Math.floor(1000 + Math.random() * 9000)

  const slug = title
    .normalize('NFD') // Tách dấu khỏi chữ cái
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu thanh (`̀ ́ ̣ ̉ ̃`)
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D') // Chuyển "đ" thành "d"
    .replace(/[^\w\s-]/g, '') // Xóa ký tự đặc biệt, giữ lại chữ, số, dấu cách, dấu '-'
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng '-'
    .replace(/-+/g, '-') // Xóa dấu '-' dư thừa
    .toLowerCase() // Chuyển về chữ thường

  // Gắn ID tự động vào cuối slug
  return `${slug}-${uniqueId}`
}

function createSlugPage(title: string): string {
  const slug = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu thanh (`̀ ́ ̣ ̉ ̃`)
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D') // Chuyển "đ" thành "d"
    .replace(/[^\w\s-]/g, '') // Xóa ký tự đặc biệt, giữ lại chữ, số, dấu cách, dấu '-'
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng '-'
    .replace(/-+/g, '-') // Xóa dấu '-' dư thừa
    .toLowerCase()

  return slug
}

function replaceHtmlToPreview(
  item: tableQLTinTuc_CauHinhDataType | Footer
): string {
  if (!item || !item.html || !item.id) return ''

  let updatedHtml = item.html
    .replace(/\[key\]/g, item.id.toString())
    .replace(/\[title\]/g, 'Tiêu đề tin tức')
    .replace(
      /\[description\]/g,
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
    )
    .replace(/\[publicDate\]/g, '12/12/2025')
    .replace(/\/\[SlugTitle\]/g, '#')
  // Thay thế src trong tất cả các thẻ <img>
  updatedHtml = updatedHtml.replace(
    /<img([^>]+)src=["']([^"']*)["']/g,
    '<img$1src="/img/default-image.jpg"'
  )

  return updatedHtml
}

function replaceCssToPreview(
  item: tableQLTinTuc_CauHinhDataType | Footer
): string {
  if (!item || !item.css || !item.id) return ''

  const updatedCss = item.css.replace(/\[key\]/g, item.id.toString())

  return updatedCss
}

class StringBuilder {
  private parts: string[] = []

  append(text: string): StringBuilder {
    this.parts.push(text)
    return this
  }

  toString(joinedCharacter: string = ''): string {
    return this.parts.join(joinedCharacter)
  }

  toReverseString(joinedCharacter: string = ''): string {
    return this.parts.reverse().join(joinedCharacter)
  }
}

export {
  createSlug,
  createSlugPage,
  replaceHtmlToPreview,
  replaceCssToPreview,
  StringBuilder,
}

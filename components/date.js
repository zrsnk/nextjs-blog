import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) { //時間の表し方をISOフォーマットにする
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
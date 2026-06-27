import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatDate(date: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs.utc(date).utcOffset(8).format(format)
}

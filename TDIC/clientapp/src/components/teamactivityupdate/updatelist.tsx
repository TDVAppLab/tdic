import {
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import type { MultiobjectiveText } from '@prisma/client'
import { format } from 'date-fns'

interface Props {
  multiobjectiveTexts: MultiobjectiveText[]
}

//UPDATESの一覧を表示するためのコンポーネント(管理画面用)
const UpdateList = ({ multiobjectiveTexts }: Props) => {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>No</TableCell>
          <TableCell>タイトル</TableCell>
          <TableCell>表示日時</TableCell>
          <TableCell>ステータス</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {multiobjectiveTexts.map((multiobjectiveText, index) => {
          return (
            <TableRow key={multiobjectiveText.id}>
              <TableCell>
                <Link href={`/adminupdate/${multiobjectiveText.id}`}>
                  {index + 1}
                </Link>
              </TableCell>
              <TableCell>{multiobjectiveText.titleJp}</TableCell>
              <TableCell>{multiobjectiveText.displayDate}</TableCell>
              <TableCell>{multiobjectiveText.status}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default UpdateList

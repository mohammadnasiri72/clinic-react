import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function TableInsuranceSelected({ insuranceListSelected }) {
  return (
    <>
      {insuranceListSelected.length === 0 && <p className='border rounded-md py-5'>بیمه ای وارد نشده است</p>}
      {insuranceListSelected.length !== 0 && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead className="">
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="center">نام بیمه</TableCell>
                  <TableCell align="center">نوع پوشش</TableCell>
                  <TableCell align="center">درصد پوشش</TableCell>
                  <TableCell align="center">تاریخ شروع</TableCell>
                  <TableCell align="center">تاریخ اتمام</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insuranceListSelected.map((e , i) => (
                  <TableRow key={e.insuranceCompanyId}>
                    <TableCell><span className='pr-3 font-semibold'>{i+1}</span></TableCell>
                    <TableCell align="center">{e.insuranceCompanyName}</TableCell>
                    <TableCell align="center">{e.coverageType}</TableCell>
                    <TableCell align="center">{e.coverageAmount}%</TableCell>
                    <TableCell align="center">{e.startDateFa}</TableCell>
                    <TableCell align="center">{e.endDateFa}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
}

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ItemDisplay() {


  function createData(
    title: string,
    voted: string,
    status: string,
    results: number[],
  ) {
    return { title, voted, status, results };
  }

  const rows = [
    createData('Trial Budget: Jup & Juice WG (JJWG)', 'Yess', 'Completed', [10, 20, 30, 40]),
    createData('Trial Budget: Jup & Juice WG (JJWG)', 'Yess', 'Completed', [10, 20, 30, 40]),
    createData('Trial Budget: Jup & Juice WG (JJWG)', 'Yess', 'Completed', [10, 20, 30, 40]),
    createData('Trial Budget: Jup & Juice WG (JJWG)', 'Yess', 'Completed', [10, 20, 30, 40]),
    createData('Trial Budget: Jup & Juice WG (JJWG)', 'Yess', 'Completed', [10, 20, 30, 40]),
  ];


  return (

    <div className='text-[14px] '>
      <div className='font-bold text-[14px]'>Proposals</div>
      <TableContainer component={Paper} color="black" >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell sx={{ fontSize: 12 }}>Title</TableCell>
              <TableCell sx={{ fontSize: 12 }} align="left">Voted</TableCell>
              <TableCell sx={{ fontSize: 12 }} align="left">Status</TableCell>
              <TableCell sx={{ fontSize: 12 }} align="left">Results</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ fontSize: 12 }} component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell sx={{ fontSize: 12 }} align="left">{row.voted}</TableCell>
                <TableCell sx={{ fontSize: 12 }} align="left">{row.status}</TableCell>
                <TableCell sx={{ fontSize: 12 }} align="left">{row.results.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

  );
}

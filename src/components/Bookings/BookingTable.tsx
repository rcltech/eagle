import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_BOOKINGS } from "../../graphql/booking";
import { TablePaginationActions } from "./TablePaginationActions";
import { Actions } from "./Actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "96vw",
      margin: "auto",
    },
  })
);

interface Booking {
  room: {
    name: string;
  };
  start: Date;
  end: Date;
  user: {
    email: string;
  };
}

type Row = {
  room: string;
  start: Date;
  end: Date;
  actions: React.ReactNode;
};

const createData = (booking: Booking): Row => {
  return {
    room: booking.room.name,
    start: booking.start,
    end: booking.end,
    actions: <Actions email={booking.user.email} />,
  };
};

const defaultRows = [
  createData({
    room: { name: "" },
    start: new Date(),
    end: new Date(),
    user: { email: "" },
  }),
];

type Column = {
  id: "room" | "start" | "end" | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: Date) => string;
};

const columns: Column[] = [
  { id: "room", label: "Booking room", minWidth: 100 },
  {
    id: "start",
    label: "Time in",
    minWidth: 200,
    align: "right",
    format: (value: Date): string => value.toISOString(),
  },
  {
    id: "end",
    label: "Time out",
    minWidth: 200,
    align: "right",
    format: (value: Date): string => value.toISOString(),
  },
  {
    id: "actions",
    label: "",
    minWidth: 30,
    align: "right",
  },
];

export const BookingTable: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<Row[]>(defaultRows);

  const { data, loading, error } = useQuery(GET_ALL_BOOKINGS);

  useEffect(() => {
    if (data && data.bookings) {
      const rows = data.bookings.map((booking: Booking) => createData(booking));
      setRows(rows);
    }
  }, [data]);

  if (loading) return <>loading</>;
  if (error) console.log(error);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} classes={{ root: classes.root }}>
      <Table size="small" aria-label="bookings table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format &&
                      Object.prototype.toString.call(value) === "[object Date]"
                        ? column.format(value as Date)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

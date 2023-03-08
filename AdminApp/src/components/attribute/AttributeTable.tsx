import * as React from 'react';
import { Attribute } from '../../graphql/attribute/schema';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Chip from '@mui/joy/Chip';


// Reference: https://codesandbox.io/s/6bmeke?file=/components/OrderTable.tsx:7018-12425
// Reference: https://mui.com/joy-ui/react-menu/

export default function AttributeTable({ attributes }:
  { attributes: Attribute[]}) {
  const [attributeList, setAttributeList] = React.useState<Attribute[]>([]);

  React.useEffect(() => {
    setAttributeList(attributes.sort((a, b) => a.name.localeCompare(b.name)));
  }, [attributes]);

  return (
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      sx={{
        width: '100%',
        borderRadius: 'md',
        flex: 1,
        overflow: 'auto',
        height: '75vh',
        margin: '20px 0',
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': theme => theme.vars.palette.background.level1,
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': theme => theme.vars.palette.background.level1,
        }}
      >
        <thead>
          <tr>
            <th style={{ width: '15%', padding: 12 }}>Name</th>
            <th style={{ width: '10%', padding: 12 }}>Category</th>
            <th style={{ width: '10%', padding: 12 }}>Type</th>
            <th style={{ width: '7.5%', padding: 12 }}>Min</th>
            <th style={{ width: '7.5%', padding: 12 }}>Max</th>
            <th style={{ width: '7.5%', padding: 12 }}>Step</th>
            <th style={{ width: '7.5%', padding: 12 }}>Symbol</th>
            <th style={{ width: '35%', padding: 12 }}>Values</th>
            <th
              aria-label="last"
              style={{ width: 'var(--Table-lastColumnWidth)' }}
            />
          </tr>
        </thead>
        <tbody>
          {attributeList.map((row: Attribute) => (
            <tr key={row.id} aria-label={row.id}>
              <td>
                {row.name}
              </td>
              <td>
                {row.category}
              </td>
              <td>
                {row.type}
              </td>
              <td>
                {row.min}
              </td>
              <td>
                {row.max}
              </td>
              <td>
                {row.step}
              </td>
              <td>
                {row.symbol}
              </td>
              <td>
                {row.values?.map((value:string) => (
                  <Chip key={value} sx={{ margin: '2px' }} variant="soft" color="neutral">{value}</Chip>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
import React from 'react';
import AccordianStatic from './accordian';

const Accordiantesting = ({ data }: any) => (
  <>
    {data.map((i: any) => (
      <AccordianStatic key={i.id} items={i.title}>
        {i.para}
      </AccordianStatic>
    ))}
  </>
);

export default Accordiantesting;

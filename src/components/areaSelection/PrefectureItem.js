import React from "react";
import { Form } from "react-bootstrap";

export default function PrefectureItem({ disable, prefecture, checkListener }) {
  const { prefName, prefCode } = prefecture;
  return (
    <div className={"prefecture-item"}>
      <Form.Check
        type="checkbox"
        label={prefName}
        onChange={() => checkListener(prefCode)}
        disabled={disable}
      />
    </div>
  );
}

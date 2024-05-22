interface Month {
  setMonth: (e: string, title: string) => void;
  setTitle: string;
}

function MonthPicker(props: Month) {
  return (
    <select
      name=""
      id=""
      onChange={(e) => props.setMonth(e.target.value, props.setTitle)}>
      <option
        value=""
        disabled
        selected
        hidden>
        Välj en månad
      </option>
      <option value="1">Januari</option>
      <option value="2">Februari</option>
      <option value="3">Mars</option>
      <option value="4">April</option>
      <option value="5">Maj</option>
      <option value="6">Juni</option>
      <option value="7">Juli</option>
      <option value="8">Augusti</option>
      <option value="9">September</option>
      <option value="10">Oktober</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
  );
}

export default MonthPicker;

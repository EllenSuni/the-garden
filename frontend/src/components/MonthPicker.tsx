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
      <option value="Januari">Januari</option>
      <option value="Februari">Februari</option>
      <option value="Mars">Mars</option>
      <option value="April">April</option>
      <option value="Maj">Maj</option>
      <option value="Juni">Juni</option>
      <option value="Juli">Juli</option>
      <option value="Augusti">Augusti</option>
      <option value="September">September</option>
      <option value="Oktober">Oktober</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
  );
}

export default MonthPicker;

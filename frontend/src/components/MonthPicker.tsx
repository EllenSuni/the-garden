function MonthPicker() {
  return (
    <select
      name=""
      id="">
      <option
        value=""
        disabled
        selected
        hidden>
        Välj en månad
      </option>
      <option value="jan">Januari</option>
      <option value="feb">Februari</option>
      <option value="mar">Mars</option>
      <option value="apr">April</option>
      <option value="may">Maj</option>
      <option value="jun">Juni</option>
      <option value="jul">Juli</option>
      <option value="aug">Augusti</option>
      <option value="sep">September</option>
      <option value="oct">Oktober</option>
      <option value="nov">November</option>
      <option value="dec">December</option>
    </select>
  );
}

export default MonthPicker;
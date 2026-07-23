import Filter from "./Filter"

function FilterOperations() {
  return (
    <div>
      <Filter filterField="affiliate"
        options={[
          { value: "all", label: "Все" },
          { value: "Сарыарка", label: "Сарыарка" },
          { value: "Бараева", label: "Бараева" },
          { value: "Конаева", label: "Конаева" },
          { value: "Сыганак", label: "Сыганак" },
          { value: "Нажимеденова", label: "Нажимеденова" },
          { value: "Женис", label: "Женис" },
          { value: "Орынбор", label: "Орынбор" },
          { value: "Кудайбердыулы", label: "Кудайбердыулы" },
        ]}
      />
    </div>
  )
}

export default FilterOperations

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelect = ({
  students,
  setLesson,
  lesson,
  setAddedStudent,
  addedStudents,
  fromViewModal,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPersonName(typeof value === "string" ? value.split(",") : value);
    fromViewModal
      ? setAddedStudent([...addedStudents, ...value])
      : setLesson({
          ...lesson,
          students: [...lesson.students, ...value],
        });
  };

  return (
    <div>
      <FormControl fullWidth className="mb-4">
        <InputLabel id="demo-multiple-name-label">Students</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Students" />}
          MenuProps={MenuProps}
          required
        >
          {students?.map((item) => (
            <MenuItem
              key={item?._id}
              value={item?._id}
              style={getStyles(item?.name, personName, theme)}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultipleSelect;

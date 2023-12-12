const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "REMOVE_USER":
      return { ...state, user: {} };

    case "SET_USERS":
      return { ...state, users: [...action.payload] };

    case "SET_LESSONS":
      return { ...state, lessons: [...action.payload] };

    case "SET_GRADES":
      return { ...state, grades: [...action.payload] };

    case "ADD_LESSON":
      return { ...state, lessons: [...state.lessons, action.payload] };

    case "UPDATE_LESSON":
      const lesson = action.payload;
      const updatedLessons = state?.lessons?.map((l) => {
        if (l?._id === lesson?._id)
          return {
            ...l,
            title: lesson?.title,
            subject: lesson?.subject,
            chapter: lesson?.chapter,
            teacher: lesson?.teacher,
          };

        return l;
      });

      return { ...state, lessons: updatedLessons };

    case "DELETE_LESSON":
      return {
        ...state,
        lessons: state?.lessons?.filter(
          (lesson) => lesson?._id !== action.payload
        ),
      };

    case "ADD_STUDENTS":
      var newLessons = state?.lessons?.map((lesson) => {
        if (lesson._id === action.payload.lessonId)
          return {
            ...lesson,
            students: [...lesson.students, ...action.payload.students],
          };

        return lesson;
      });

      return { ...state, lessons: newLessons };

    case "REMOVE_STUDENT":
      newLessons = state?.lessons?.map((lesson) => {
        if (lesson?._id === action.payload.lessonId)
          return {
            ...lesson,
            students: lesson?.students.filter(
              (stu) => stu._id !== action.payload.student
            ),
          };

        return lesson;
      });

      return {
        ...state,
        lessons: newLessons,
      };

    case "ASSIGN_GRADE":
      return {
        ...state,
        grades: [...state.grades, action.payload],
      };

    case "UPDATE_GRADE":
      const { grade, gradeId } = action.payload;
      const newGrades = state?.grades?.map((item) => {
        if (item?._id === gradeId) return { ...item, grade };
        return item;
      });

      return {
        ...state,
        grades: newGrades,
      };

    case "UPDATE_USER":
      const { name, email, avatar } = action.payload;
      return {
        ...state,
        user: { ...state.user, name, email, avatar },
      };

    default:
      return state;
  }
};

export default AppReducer;

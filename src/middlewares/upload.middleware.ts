import multer from "multer";

export const upload = multer({
  dest: "uploads/",
  fileFilter: (_, file, cb) => {
    if (file.mimetype !== "text/csv") {
      cb(new Error("Only CSV files allowed"));
    }
    cb(null, true);
  }
});

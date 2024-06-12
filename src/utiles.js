import Swal from "sweetalert2";

export const userRoles = [
  "Exam Administrator",
  "Inventory Manager",
  "Inventory Staff",
  "Help Desk Supporter",
  "Student",
];

export const subjects = ["Sinhala", "Mathematics", "English", "History"];

export const simpleNotification = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: icon,
    title: title,
  });
};

export const ASSETS_URL = "http://localhost:5000";

export const inventoryCategories = [
  "Electrical",
  "Furniture",
  "Textbooks and Educational Materials",
  "Stationery",
  "Technology Equipment",
  "Laboratory Supplies",
  "Sports Equipment",
];

export const calculateTimeAgo = (repliedTime) => {
  const currentTime = new Date();
  const replied = new Date(repliedTime);
  const timeDifference = currentTime - replied;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  } else if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export const truncatedSentence = (sentence) => {
  const words = sentence.split(" ");
  let truncatedSentence = "";

  if (words.length > 3) {
    truncatedSentence = words.slice(0, 3).join(" ") + "...";
  } else {
    truncatedSentence = sentence;
  }

  return truncatedSentence;
};

export const formatDate = (dateString) => {
  // Parse the date string
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Format the date as MM/DD/YYYY
  return `${month}/${day}/${year}`;
};

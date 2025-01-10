import { useRef, useEffect, useState } from "react";
import { FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";
import { FiDownload } from "react-icons/fi";
import Paragraph from "./Paragraph";
import Heading from "./Heading";

export default function FileInput({
  poster,
  onUpload,
  onDelete,
  count,
  formats,
}: {
  poster: File[];
  onUpload: (file: File[]) => void;
  onDelete: (index: number) => void;
  count: number;
  formats: string[];
}) {
  const dropContainer = useRef<any>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<any>(null);

  function handleDrop(e: any, type: string) {
    let files;
    if (type === "inputFile") {
      files = [...e.target.files];
    } else {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      files = [...e.dataTransfer.files];
    }

    const allFilesValid = files.every((file) => {
      return formats.some((format) => file.type.endsWith(`/${format}`));
    });

    if (poster.length >= count) {
      showAlert(
        "warning",
        "Maximum Files",
        `Only ${count} files can be uploaded`
      );
      return;
    }
    if (!allFilesValid) {
      showAlert(
        "warning",
        "Invalid Media",
        `Invalid file format. Please only upload ${formats
          .join(", ")
          .toUpperCase()}`
      );
      return;
    }
    if (count && count < files.length) {
      showAlert(
        "error",
        "Error",
        `Only ${count} file${count !== 1 ? "s" : ""} can be uploaded at a time`
      );
      return;
    }

    if (files && files.length) {
      onUpload(files);
      TopNotification.fire({
        icon: "success",
        title: "Image(s) uploaded",
      });
    }
  }

  useEffect(() => {
    function handleDragOver(e: any) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    }
    function handleDragLeave(e: any) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
    dropContainer.current.addEventListener("dragover", handleDragOver);
    dropContainer.current.addEventListener("drop", handleDrop);
    dropContainer.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      if (dropContainer.current) {
        dropContainer.current.removeEventListener("dragover", handleDragOver);
        dropContainer.current.removeEventListener("drop", handleDrop);
        dropContainer.current.removeEventListener("dragleave", handleDragLeave);
      }
    };
  }, [poster]);

  const TopNotification = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  function showAlert(icon: any, title: string, text: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      width: 500,
      timer: 1500,
    });
  }

  return (
    <>
      <div
        className={`${
          dragging ? "border" : "border-dashed border-white"
        } flex h-72 md:h-[500px] items-center justify-center cursor-pointer mx-auto text-center border-2 rounded-[10px] mt-4 py-5`}
        ref={dropContainer}
        onClick={() => {
          fileRef.current.click();
        }}
      >
        <div className="flex-1 flex flex-col">
          <div className="mx-auto text-white mb-2">
            <FiDownload size={30} />
          </div>
          <div className="text-[12px] font-normal text-white">
            <input
              className="opacity-0 hidden"
              type="file"
              multiple
              accept="image/*"
              ref={fileRef}
              onChange={(e) => handleDrop(e, "inputFile")}
            />
            <Paragraph variant="bodySmall">Drop an image here</Paragraph>
          </div>
        </div>
      </div>

      {poster.length > 0 && (
        <div className="mt-4 grid grid-col-1 md:grid-cols-2 gap-y-4 gap-x-4">
          {poster?.map((img: any, index: number) => (
            <div
              key={index}
              className="w-full px-3 py-3.5 rounded-md bg-cardHover space-y-3"
            >
              <div className="flex justify-between">
                <div className="w-[70%] flex justify-start items-center space-x-2">
                  <Heading
                    variant="headingTwo"
                  >
                    {img.type.match(/image.*/i) ? (
                      <FaRegFileImage />
                    ) : (
                      <FaRegFile />
                    )}
                  </Heading>
                  <div className=" space-y-1 ml-3">
                    <Paragraph variant="bodySmall">{img.name}</Paragraph>
                    <Paragraph variant="bodySmall">{`${Math.floor(
                      img.size / 1024
                    )} KB`}</Paragraph>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="space-y-1">
                    <div
                      className="text-gray-500 text-[17px] cursor-pointer"
                      onClick={() => onDelete(index)}
                    >
                      <BsX className="ml-auto" />
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">
                      Done
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

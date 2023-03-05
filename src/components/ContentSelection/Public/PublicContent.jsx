import { useState } from "react";
import {
  Unstable_Grid2,
  Checkbox,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { useEffect } from "react";
import { useContent } from "../../../hooks/useContent";
import { useRouter } from "next/router";
import ContentNav from "../ContentNav";

const PublicContent = () => {
  const [files, setFiles] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const { getPublicContent, addPublicSelection, getPublicSelection } =
    useContent();
  const router = useRouter();
  const { domain } = router.query;

  const getContent = async () => {
    let data = await getPublicContent();
    data = data.files;
    let allHashes = data.map((file) => file.ipfs_pin_hash);
    let selectedHashes = await getPublicSelection(domain);
    if (selectedHashes.userContent !== null) {
      selectedHashes = selectedHashes.userContent;
      const uniqueValues = allHashes.filter(
        (hash) => !selectedHashes.includes(hash)
      );
      setFiles(uniqueValues);
    } else {
      setFiles(allHashes);
    }
  };

  useEffect(() => {
    if (domain) {
      getContent();
    }
  }, [domain]);

  const handleCheckboxChange = (event, hash) => {
    const checked = event.target.checked;
    if (checked) {
      setCheckedItems((prevState) => [...prevState, hash]);
    } else {
      setCheckedItems((prevState) => prevState.filter((item) => item !== hash));
    }
  };

  const handleAdd = async () => {
    let result = await addPublicSelection(checkedItems);
    if (result.success) {
      setCheckedItems([]);
      router.push(`/${domain}`);
    }
  };

  return (
    <Unstable_Grid2>
      {/* TODO - Add this to ContentNav */}
      <button
        className="rounded-3xl text-center ml-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
        onClick={handleAdd}
      >
        Add Files
      </button>
      <button
        className="rounded-3xl text-center ml-4 btn border py-2 border-solid border-white btn-dark hvr-grow cursor-pointer"
        onClick={() => router.push(`/${domain}`)}
      >
        MyPage
      </button>
      <div className="grid grid-cols-2 mt-6 gap-4 w-full">
        {files?.length > 0 &&
          files.map((file) => {
            return (
              <div>
                <div className="content-card content-card-public flex">
                  <div>
                    <button>
                      <Checkbox 
                        value={file}
                        onChange={(e) => handleCheckboxChange(e, file)}
                        className="checkbox checkbox-public"
                      />
                    </button>
                  </div>
                  <CardContent>
                    <a href={`https://gateway.pinata.cloud/ipfs/${file}`} target="_blank">{file}</a>
                  </CardContent>
                </div>
              </div>
            );
          })}
      </div>
    </Unstable_Grid2>
  );
};

export default PublicContent;

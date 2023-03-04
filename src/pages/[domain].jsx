import { Typography, Unstable_Grid2, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { useContent } from "../hooks/useContent";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

const Domain = () => {
  const { isDomainOwner } = useContent();
  const [domainOwner, setDomainOwner] = useState(false);

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { domain } = router.query;

  const isOwner = async () => {
    const data = await isDomainOwner(domain);
    if (data.isOwner) {
      setDomainOwner(true);
    }
    return data;
  };

  useEffect(() => {
    if (!domainOwner) {
      isOwner();
    }
  }, [domainOwner]);

  return (
    <MainLayout>
      <Unstable_Grid2>
        {isAuthenticated && domainOwner && (
          <Link passHref href={`/selectcontent?domain=${domain}`}>
            Add Files
          </Link>
        )}

        <h1>No content yet</h1>
      </Unstable_Grid2>
    </MainLayout>
  );
};

export default Domain;

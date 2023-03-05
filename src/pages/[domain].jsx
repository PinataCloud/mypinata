import {
  Typography,
  Unstable_Grid2,
  Button,
  Link,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { useContent } from "../hooks/useContent";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import LockedContent from "../components/ContentDisplay/LockedContent";
import UnlockedContent from "../components/ContentDisplay/UnlockedContent";

const Domain = () => {
  const { isDomainOwner } = useContent();
  const [domainOwner, setDomainOwner] = useState(false);
  const [domain, setDomain] = useState();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isOwner = async () => {
    const data = await isDomainOwner(domain);
    if (data) {
      setDomainOwner(true);
    }
    return data;
  };

  useEffect(() => {
    if (router.isReady) {
      setDomain(router.query.domain);
    }
    isOwner();
  }, [router.isReady, domain]);

  return (
    <MainLayout>
      <Unstable_Grid2>
        {isAuthenticated && domainOwner && (
          <Link passHref href={`/selectcontent?domain=${domain}`}>
            Add Files
          </Link>
        )}
        <LockedContent />
        <UnlockedContent />
      </Unstable_Grid2>
    </MainLayout>
  );
};

export default Domain;

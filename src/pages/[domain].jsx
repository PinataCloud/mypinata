import {
  Typography,
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

const Domain = () => {
  const { isDomainOwner } = useContent();
  const [domainOwner, setDomainOwner] = useState(false);
  const [domain, setDomain] = useState();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const isOwner = async () => {
    const data = await isDomainOwner(domain);
    if (data.isOwner) {
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
      <div className="relative h-[75vh]">
        {isAuthenticated && domainOwner && (
          <Link className="add-item-link" passHref href={`/selectcontent?domain=${domain}`}>
            <img className="add-item-btn hvr-grow" src="./cloud-btn.png"/>
          </Link>
        )}
        <LockedContent />
      </div>
    </MainLayout>
  );
};

export default Domain;

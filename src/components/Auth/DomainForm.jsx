import { useState } from "react";
import { useRouter } from "next/router";
import { useContent } from "../../hooks/useContent";
import './globals.css';

export default function DomainForm() {
  const router = useRouter();
  const { addUserDomain } = useContent();

  const [domain, setDomain] = useState("");

  const handleDomainSubmit = async (e) => {
    e.preventDefault();
    let data = await addUserDomain(domain);
    try {
      if (data.success) {
        router.push(`/${domain}`);
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Create a User Domain</h2>
        </div>
        <form onSubmit={handleDomainSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div>
            <input
              id="domain"
              name="domain"
              type="domain"
              required
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="pinnie"
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

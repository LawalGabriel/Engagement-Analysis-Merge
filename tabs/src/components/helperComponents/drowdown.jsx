import { useState } from "react";
import { Dropdown, Loader } from '@fluentui/react-northstar'
import { toasterErrorMessage } from "../utils/errorHandlingUtils";
import { useData } from "@microsoft/teamsfx-react";
import { Toaster } from "react-hot-toast";

export default function TestDropdown(props) {
    const { apiClient, triggerConsent } = { ...props };
    const [dropdownData, setDropDownData] = useState();
    const [apiData, setApiData] = useState(undefined);
    const [isClicked, setIsClicked] = useState(false);

    const { loading } = useData(async () => {
        try {
            const response = await apiClient.get("users");

            let processedData = response.data.map((user) => {
                return { header: user.userPrincipalName, content: user.displayName }
            });
            processedData = [{ header: "All", content: "All Users" }, ...processedData]
            setDropDownData(processedData)
        } catch (error) {
            let errorMessage = error.response.data.error;
            if (errorMessage.includes("invalid_grant")) {
                triggerConsent(true);
            } else {
                toasterErrorMessage("An error occured!");
            }
        }
    });


    const handleChange = async (event) => {
        setIsClicked(true);
        setApiData();
        try {
            const response = await apiClient.get(`analytics?userUpn=${event.value.header}`);
            setIsClicked(false);
            setApiData(response.data);
        } catch (error) {
            setIsClicked(false);
            let errorMessage = error.response.data.error;
            if (errorMessage.includes("invalid_grant")) {
                triggerConsent(true);
            } else {
                toasterErrorMessage("Failed to retrieve your Microsoft 365 data");
            }
        }
    }

    const getA11ySelectionMessage = {
        onAdd: item => `${item.header} has been selected.`,
        onRemove: item => `${item.header} has been removed.`,
    }

    const seconddata = [7,30,60,180]

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                {loading && <Loader />}
            {!loading && <Dropdown
                key={dropdownData.content}
                search
                items={dropdownData}
                placeholder="Start typing a name"
                getA11ySelectionMessage={getA11ySelectionMessage}
                noResultsMessage="We couldn't find any matches."
                onChange={async (_, event) => await handleChange(event)}
            />}
                </div>
                <div className="col-md-4">
                {loading && <Loader />}
            {!loading && <Dropdown
                key={dropdownData.content}
                search
                items={seconddata}
                placeholder="Select Duration"
                getA11ySelectionMessage={getA11ySelectionMessage}
                noResultsMessage="We couldn't find any matches."
                onChange={async (_, event) => await handleChange(event)}
            />}
                </div>
            </div>
           
             {isClicked && !apiData && (
                <pre className="fixed">
                    <Loader />
                </pre>
            )}
            {!isClicked && !apiData && <pre className="fixed"></pre>}
            {apiData && <pre className="fixed">{JSON.stringify(apiData, null, 2)}</pre>}
            <Toaster toastOptions={{ duration: 5000 }} /> 
        </div>
    );
}

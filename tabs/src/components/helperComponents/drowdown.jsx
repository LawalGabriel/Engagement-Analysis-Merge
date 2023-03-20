import { useState } from "react";
import { Dropdown, Loader } from '@fluentui/react-northstar'
import { toasterErrorMessage } from "../utils/errorHandlingUtils";
import { useData } from "@microsoft/teamsfx-react";
import { Toaster } from "react-hot-toast";

const inputItems = [
    {
        header: 'Bruce Wayne',
        content: 'Software Engineer',
    },
    {
        header: 'Natasha Romanoff',
        content: 'UX Designer 2',
    }
]


export function TestDropdown(props) {
    let { apiClient, triggerConsent } = { ...props };
    let [dropdownData, setDropDownData] = useState();
    const [apiData, setApiData] = useState(undefined);
    const [isClicked, setIsClicked] = useState(false);

    const { loading } = useData(async () => {
        try {
            const response = await apiClient.get("users");

            let processedData = response.data.map((user) => {
                return { header: user.userPrincipalName, content: user.displayName }
            });
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
        console.log("........... This is working")
console.log(event);
        setIsClicked(true);
        setApiData();
        try {
            const response = await apiClient.get(`analytics?upn=${event.value.header}`);
            setIsClicked(false);
            setApiData(response.data);
        } catch (error) {
            console.log(error)
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

    return (
        <div>
            {loading && <Loader />}
            {!loading && <Dropdown
                key={dropdownData.content}
                search
                items={dropdownData}
                placeholder="Start typing a name"
                getA11ySelectionMessage={getA11ySelectionMessage}
                noResultsMessage="We couldn't find any matches."
                onChange={async (_,event) => await handleChange(event)}
            />}
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

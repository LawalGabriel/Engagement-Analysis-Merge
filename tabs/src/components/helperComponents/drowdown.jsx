import { useState } from "react";
import { Dropdown, Loader } from '@fluentui/react-northstar'
import { toasterErrorMessage } from "../utils/errorHandlingUtils";
import { useData } from "@microsoft/teamsfx-react";
import { Toaster } from "react-hot-toast";
import MyHeader from "../TileHeader";
import MyChart from "../Chart";

export default function TestDropdown(props) {
    const { apiClient, triggerConsent, loggedInUser } = { ...props };
    const [dropdownData, setDropDownData] = useState();
    const [apiData, setApiData] = useState(undefined);
    const [isClicked, setIsClicked] = useState(false);
    const [outlookData, setOutlookData] = useState([]);
    const [teamsData, setTeamsData] = useState([]);
    const [sharepointData, setSharepointData] = useState([]);
    const [meetingCount, setMeetingCount] = useState([]);
    const [audioCount, setAudioCount] = useState([]);
    const [videoCount, setVidoeCount] = useState([]);
    const [ScreenCount, setScreenCount] = useState([]);
    const [meetingData, setMeetingData] = useState([]);

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

    // Get analytics data for logged in user
    useData(async () => {
        await getAnalyticsData(loggedInUser.preferredUserName);
    });

    const handleChange = async (event) => {
        setIsClicked(true);
        setApiData();
        try {
            setIsClicked(false);
            await getAnalyticsData(event.value.header);
        } catch (error) {
            setIsClicked(false);
            toasterErrorMessage("An error occured!");
        }
    }
    
    const getAnalyticsData = async (user) => {
        try {
            const response = await apiClient.get(`analytics?userUpn=${user}`);

            setApiData(response.data);
            setOutlookData(restructureData(response.data.outlook, ["Send Count", "Receive Count", "Read Count"]));

            // Implementation: step 2
            setSharepointData(restructureData(response.data.sharepoint, ["Shared Internally File Count", "Shared Externally File Count", "Viewed Or Edited File Count", "Visited Page Count"]));
            setTeamsData(restructureData(response.data.teams, ["Call Count", "Private Chat Message Count", "Team Chat Message Count", "Meetings Organized Count", "Ad Hoc Meetings Organized Count"]));
            setMeetingCount(restructureData(response.data.teams, ["Meeting Count"]));
            setAudioCount(restructureData(response.data.teams, ["Audio Duration In Seconds"]));
            setVidoeCount(restructureData(response.data.teams, ["Video Duration In Seconds"]));
            setScreenCount(restructureData(response.data.teams, ["Screen Share Duration In Seconds"]));
            setMeetingData(restructureData(response.data.teams, ["Meetings Attended Count", "Scheduled One-time Meetings Attended", "Scheduled Recurring Meetings Attended Count", "Ad Hoc Meetings Attended Count"]))
        } catch (error) {
            let errorMessage = error.response.data.error;
            if (errorMessage.includes("invalid_grant")) {
                triggerConsent(true);
            } else {
                toasterErrorMessage("An error occured!");
            }
        }
    }

    const getA11ySelectionMessage = {
        onAdd: item => `${item.header} has been selected.`,
        onRemove: item => `${item.header} has been removed.`,
    }
    console.log("data", apiData)
    console.log("Outlook", outlookData)
    console.log("teams", teamsData)
    console.log("sharepoint", sharepointData)
    console.log("meeting", meetingCount)
    console.log("video", videoCount)
    console.log("audio", audioCount)
    console.log("screen", ScreenCount)
    console.log("meetingdata", meetingData)

    // Implementation: step 1 (nothing)
    function restructureData(data, columns) {
        let testData = [];
        let count = 1;
        for (let column in data) {
            if (columns.includes(column)) {
                testData.push({ id: count, label: column, count: data[column] });
                count++;
            }
        }
        return testData;
    }

    // "Shared Internally File Count" "Shared Externally File Count" "Viewed Or Edited File Count" "Visited Page Count"

    const seconddata = [7, 30, 60, 180]

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    {loading && <Loader />}
                    {!loading && <Dropdown
                        key={dropdownData.content}
                        // search // this was commented out because it didn't allow for setting initial (default) value
                        items={dropdownData}
                        defaultValue={[{ header: loggedInUser.displayName, content: loggedInUser.preferredUserName }]}
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
            {/* Implementation: step 3 (nothing) */}
            <MyHeader apiData={apiData} meetingCount={meetingCount} audioCount={audioCount} videoCount={videoCount} ScreenCount={ScreenCount} />
            <MyChart apiData={apiData} sharepointData={sharepointData} teamsData={teamsData} outlookData={outlookData} meetingData={meetingData} />
            <Toaster toastOptions={{ duration: 5000 }} />
        </div>
    );
}

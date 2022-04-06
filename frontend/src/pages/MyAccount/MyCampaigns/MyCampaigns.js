import { useMultipleFetch } from '../../../controllers/useMultipleFetch';
import MyCampaignCard from './MyCampaignCard';

const MyCampaigns = ({ createdCampaigns }) => {
    const { loading, data: campaigns } = useMultipleFetch(createdCampaigns.map(({ campaignId }) => `http://localhost:4545/api/campaign/${campaignId}`));

    if (loading) {
        return <h1>Loading...</h1>
    }
    return <>
        <div className="col">
            {campaigns.map((item, key) => (
                <div className="row mb-4">
                    <MyCampaignCard campaign={item} />
                </div>

            ))}
        </div>

    </>
}

export default MyCampaigns;
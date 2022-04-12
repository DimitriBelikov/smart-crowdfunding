import { useMultipleFetch } from '../../../controllers/useMultipleFetch';
import Card from './Card';

const MyDonations = ({ donatedCampaigns }) => {
    const { loading, data: campaigns } = useMultipleFetch(donatedCampaigns.map(({ campaignId }) => `http://localhost:4545/api/campaign/${campaignId}`));

    if (loading) {
        return <h1>Loading...</h1>
    }
    return <>
        <div className="col">
            {donatedCampaigns.map((x) => (
            campaigns.map((item, key) => (
                <div className="row mb-4" key={key}>
                    <Card campaign={item} donationAmount={x.donationAmount} donatedOn={x.donatedOn}/>
                </div>
            ))))
            
            }
        </div>

    </>
}

export default MyDonations;
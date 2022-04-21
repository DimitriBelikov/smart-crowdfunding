import { useMultipleFetch } from '../../../controllers/useMultipleFetch';
import Card from './Card';

//AntD Components
import { Spin } from 'antd';

const MyCampaigns = ({ createdCampaigns }) => {
    const { loading, data: campaigns } = useMultipleFetch(createdCampaigns.map(({ campaignId }) => `http://localhost:4545/api/campaign/${campaignId}`));


    if (loading) {
        return (
          <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <Spin size='large'/>
          </div>
        )
      }
    return <>
        <div className="col">
            {campaigns.map((item, key) => (
                <div className="row mb-4" key={key}>
                    <Card campaign={item} />
                </div>

            ))}
        </div>

    </>
}

export default MyCampaigns;
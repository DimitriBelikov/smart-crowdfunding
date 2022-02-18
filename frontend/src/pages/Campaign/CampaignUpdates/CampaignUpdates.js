import React from 'react';

const CampaignUpdates = ({ updates }) => {
    return <>
        <div className="container border border-primary">
            {updates.map((update, index) => (
                <li className='border border-secondary m-3' style={{ listStyleType: 'none' }} key={index}>
                    <div class="row">
                        <div class="col-md-9">
                            <h3>Update Title</h3>
                        </div>
                        <div class="col-md-3">
                            <h6>Date: XX/XX/XXXX</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h6>Update BY</h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small></p>
                        </div>
                    </div>
                </li>
            ))}
        </div >
    </>
}

export default CampaignUpdates;
import React from 'react';

const RawJson = ({ location }) => (
    <div>
        <h3>Raw JSON</h3>
        <p className="raw-json">
            {JSON.stringify(location.state.story)}
        </p>
    </div>
);

export default RawJson;
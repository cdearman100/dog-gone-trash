import React, { useEffect, useState } from 'react';
import { getRewards } from '../api/rewardsApi';

const RewardsList = () => {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            const data = await getRewards();
            setRewards(data);
        };

        fetchRewards();
    }, []);

    return (
        <div>
            <h1>Rewards</h1>
            <ul>
                {rewards.map((reward) => (
                    <li key={reward.id}>
                        {reward.name} - {reward.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RewardsList;

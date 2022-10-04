import { useState } from 'react';

export const Prompts = () => {
    const [prompts, setPrompts] = useState<String[]>([]);

    return (
        <div id="prompts-div" data-testid="prompts-div">
            <h1>Prompts goes here</h1>
        </div>
    )
}

export default Prompts;
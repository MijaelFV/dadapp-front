import React from 'react'

const spaces = [
    1,
    2,
    3,
    4,
    3,
    4,
    3,
    4,
    3,
    4,
    3,
    4,
    3,
    4,
    3,
    4,

]

export const SpaceScreen = () => {
    return (
        <div className="space-container">
            <div className="space-card-container">
                {spaces.map((space) => (
                    <div className="space-card" key={space.name}>
                        Espacio
                    </div>
                ))}
            </div>
        </div>
    )
}
import CreateAStore from '../../page/CreateAStore/CreateAStore';

const ShopsRoute = [
    {
        path: '/stores',
        name: 'stores',
        element: <CreateAStore />,
        children: [
            {
                path: '/stores/create',
                name: 'create',
                element: '<CreateAStore />',
            },
        ],
    },
];
export default ShopsRoute;

export default $sceDelegateProvider =>
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://api.openweathermap.org/**'
    ])
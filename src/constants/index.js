import colors from './colors';
import device from './device';
import fonts from './fonts';
import func from './functions';
import gStyle from './globalStyles';
import images from './preloadImages';

const url = 'http://192.168.43.42:5000/api/v1'; // TODO: change to live server
const socketUrl = 'ws://192.168.43.42:5000/ws';

export { colors, device, fonts, func, gStyle, images, url, socketUrl };

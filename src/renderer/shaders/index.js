import AntiAliasingShader from './common/antialiasing/AntiAliasingShader';
import LineShader from './geometry/line/LineShader';
import PointShader from './geometry/point/PointShader';
import TriangleShader from './geometry/triangle/TriangleShader';
import * as styler from './styler/stylerShaders';
import * as symbolizer from './symbolizer/symbolizerShaders';

const AABlender = AntiAliasingShader;

const renderer = {
    createPointShader: gl => new PointShader(gl),
    createTriShader: gl => new TriangleShader(gl),
    createLineShader: gl => new LineShader(gl)
};

export { renderer, styler, symbolizer, AABlender };

export default {
    renderer,
    styler,
    symbolizer,
    AABlender
};

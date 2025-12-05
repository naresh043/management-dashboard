import "@testing-library/jest-dom";

// Polyfill for React Router – fixes "TextEncoder/TextDecoder is not defined"
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import styled from 'styled-components';
import { hideVisually } from 'polished';

/**
 * Hide content visually but keep it accessible to screen readers.
 */
export const VisuallyHidden = styled.p(hideVisually());

/** @component */
export default VisuallyHidden;

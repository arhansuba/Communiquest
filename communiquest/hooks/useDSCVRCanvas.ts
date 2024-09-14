import { useState, useEffect } from 'react';
import { CanvasClient } from '@dscvr-one/canvas-client-sdk'; // Ensure the module is correctly installed

export const useDSCVRCanvas = () => {
  const [canvasClient, setCanvasClient] = useState<CanvasClient | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false); // Specify the type for clarity

  useEffect(() => {
    const initCanvas = async () => {
      const client = new CanvasClient();
      try {
        await client.ready();
        setCanvasClient(client);
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize DSCVR Canvas:', error);
      }
    };

    initCanvas();
  }, []);

  return { canvasClient, isReady };
};

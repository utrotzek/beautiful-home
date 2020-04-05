<?php


namespace App\File;


class TempFile
{
    protected $fileHandle;

    /**
     * Creates a temp file and returns the path to the file
     */
    public function createTempFile($content): string
    {
        $this->fileHandle = tmpfile();
        fwrite($this->fileHandle, $content);
        $meta = stream_get_meta_data($this->fileHandle);
        return $meta['uri'];
    }
}
